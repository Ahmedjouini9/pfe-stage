const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const {google} = require('googleapis')
const {OAuth2} = google.auth
// const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const secret = "test";

const userCtrl = {
    register: async (req, res) => {
        try {
            const {email, password} = req.body
            
            if(!email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser =await  Users.create ({
                email, password: passwordHash
            })

            //  const activation_token = createActivationToken(newUser)

            //  const url = `${CLIENT_URL}/user/activate/${activation_token}`
            //  sendMail(email, url, "Verify your email address")
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
                expiresIn: "1h",
              });
            res.status(201).json({ newUser, token });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    adminRegister: async (req, res) => {
        try {
            const {username ,email, password} = req.body
            
            if(!username || !email || !password )
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser =await  Users.create ({
                username ,email, password: passwordHash, isAdmin:true
            })

            //  const activation_token = createActivationToken(newUser)

            //  const url = `${CLIENT_URL}/user/activate/${activation_token}`
            //  sendMail(email, url, "Verify your email address")
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
                expiresIn: "1h",
              });
            res.status(201).json({ newUser, token });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
     activateEmail: async (req, res) => {
         try {
             const {activation_token} = req.body
             const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

             const {name, email, password} = user
             
             const check = await Users.findOne({email})
             if(check) return res.status(400).json({msg:"This email already exists."})
             
             const newUser = new Users({
                 name, email, password
                })

             await newUser.save()
             
             res.json({msg: "Account has been activated!"})
             
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
        updatePassword :  async (req, res) => {
            const {id} =req.params
                const user = await Users.findById(id).select("+password");
              
                const isPasswordMatched = await bcrypt.compare(req.body.oldPassword,user.password);
              
                if (!isPasswordMatched) {
                    return res.status(404).json({ message: "old password incorrect" });
                }
              
                if (req.body.newPassword !== req.body.confirmPassword) {
                    return res.status(404).json({ message: "password doesnt match" });
                }
              try{
                const passwordHash = await bcrypt.hash(req.body.newPassword, 12)
                user.password = passwordHash;
              
                await user.save();
                res.json({msg: "Password successfully changed!"})

              }catch (error) {
                res.status(500).json({ message: "Something went wrong" });
                console.log(error);
              }}, 
        login:async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const oldUser = await Users.findOne({ email });
          if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });
      
          const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
      
          if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid password" });
      
          const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "1d",
          });
      
          res.status(200).json({ result: oldUser, token });
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
          console.log(error);
        }
      },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist in our system."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Users.findById(id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
         const { id } = req.params;
        const { firstname, lastname, address, phonenumber, region,country } = req.body;
        try {
        const updatedUser = {
            firstname,
            lastname,
            address,
            phonenumber,
            region,
            country,
            _id: id,
          };
            await Users.findByIdAndUpdate(id, updatedUser, { new: true });
            res.status(200).json({msg : "update success !"});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, name, picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
          // facebookLogin: async (req, res) => {
    //     try {
    //         const {accessToken, userID} = req.body

    //         const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            
    //         const data = await fetch(URL).then(res => res.json()).then(res => {return res})

    //         const {email, name, picture} = data

    //         const password = email + process.env.FACEBOOK_SECRET

    //         const passwordHash = await bcrypt.hash(password, 12)

    //         const user = await Users.findOne({email})

    //         if(user){
    //             const isMatch = await bcrypt.compare(password, user.password)
    //             if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

    //             const refresh_token = createRefreshToken({id: user._id})
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7*24*60*60*1000 // 7 days
    //             })

    //             res.json({msg: "Login success!"})
    //         }else{
    //             const newUser = new Users({
    //                 name, email, password: passwordHash, avatar: picture.data.url
    //             })

    //             await newUser.save()
                
    //             const refresh_token = createRefreshToken({id: newUser._id})
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7*24*60*60*1000 // 7 days
    //             })

    //             res.json({msg: "Login success!"})
    //         }


    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // }
}





function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl