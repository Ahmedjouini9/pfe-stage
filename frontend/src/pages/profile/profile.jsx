 import "./profile.css"
 import React,{useEffect,useState} from 'react'
 import noAvatart from '../../assets/noAvatar.png'
 import { toast } from "react-toastify";
 import { useParams } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import { updateUser } from "../../redux/features/authSlice";
 const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address : "",
    country : "",
    region :""
  };

const Profile = () => {
const [userData, setUserData] = useState(initialState);
  
  const { error,user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const { firstName, lastName, phoneNumber,address,country,region } = userData;
  const { id } = useParams();   

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && phoneNumber && address && country && region) {
      const updatedUserData = { ...userData};
      dispatch(updateUser({id,updatedUserData, toast }));
      }
    };
  
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

    
return (
    <>
    <form onSubmit={handleSubmit}>
    <div class="container rounded bg-white mt-5 mb-5"> 
    <div class="row"> 
    <div class="col-md-3 border-right"> 
    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
        <img class="rounded-circle w-75 mt-1" src={noAvatart} alt=""/>
            <span class="font-weight-bold">ahmed</span>
            <span class="text-black-50">{user?.result?.email}</span>
            <span> </span>
            </div>
             </div> 
             
            <div class="col-md-5 border-right"> 
            <div class="p-3 py-5"> 
            <div class="d-flex justify-content-between align-items-center mb-3"> 
            <h4 class="text-right">Profile Settings</h4> 
            </div> <div class="row mt-2"> 
            <div class="col-md-6">
                <label class="labels">Name</label>
                <input type="text" class="form-control" 
                placeholder="first name" name="firstName"
                value={user?.result?.firstname}
                onChange={onInputChange}/>
                    </div> 
                    <div class="col-md-6">
                        <label class="labels">Surname</label>
                        <input type="text" class="form-control"
                        name="lastName" value={user?.result?.lastname}
                        placeholder="surname" 
                        onChange={onInputChange}/>
                            </div> 
                            </div> 
                            <div class="row mt-3"> 
                            <div class="col-md-12">
                                <label class="labels">PhoneNumber</label>
                                <input type="text" class="form-control" 
                                placeholder="enter phone number" 
                                name="phoneNumber"
                                value={user?.result?.phonenumber}
                                onChange={onInputChange}/></div> 
                                <div class="col-md-12">
                <label class="labels">Address</label>
                <input type="text" class="form-control" 
                name ="address"
                placeholder="enter address"
                value={user?.result?.address}                
                onChange={onInputChange}/></div>                                 
                <div class="col-md-12"><label class="labels">Email ID</label>
                <input type="text" class="form-control" placeholder="enter email id"
                    disabled value={user?.result?.email}/>
                                </div> 
                                {/* <div class="col-md-12">
                                    <label class="labels">company site</label>
                                    <input type="text" class="form-control" placeholder="education" value=""/>
                                        </div>  */}
                     </div> 
                        <div class="row mt-3"> 
                        <div class="col-md-6"><label class="labels">Country</label>
                        <input type="text" class="form-control" 
                        name="country"
                        placeholder="country" value={user?.result?.country}
                        onChange={onInputChange}/>
                        </div>      
                        <div class="col-md-6">
                        <label class="labels">State/Region</label>
                        <input type="text" class="form-control" 
                        name ="region"
                        value={user?.result?.region}
                            placeholder="state"
                            onChange={onInputChange}/>
                        </div> 
                            </div> 
                                <div class="mt-5 text-center">
                                <button class="btn btn-primary profile-button" 
                                 type="button">Save Profile</button>

                        </div> 
                
                        </div> 
                        </div> 
            <div class="col-md-4"> 
              <div class="p-3 py-5"> 
                <div class="d-flex justify-content-between align-items-center experience">
                    <span>Edit Experience</span>
                    <span class="border px-3 p-1 add-experience">
                  <i class="fa fa-plus"></i>&nbsp;Experience</span>
                  </div>
                  <br/> 
                    <div class="col-md-12">
                  <label class="labels">Experience in Designing</label>
                  <input type="text" class="form-control" placeholder="experience" value=""/>
              </div> 
                <br/> 
                  <div class="col-md-12">
                <label class="labels">Additional Details</label>
              <input type="text" class="form-control" placeholder="additional details" value=""/></div> 
          </div> 
        </div> 
    </div>
</div>
</form>
</>

)};

export default Profile;



// import "./profile.css"
// import React from 'react'
// import noAvatart from '../../assets/noAvatar.png'






// const Profile = () => {
// //   const { user } = useSelector((state) => ({ ...state.auth }));
// //   const token = user?.token;



//     return (
// <div>
// <span class="main_bg"></span>
// {/*  Main-Container */}
// <div class="container">

//     {/* Header/Navbar */}
//     <header>
//         <div class="brandLogo">
//             <figure><img src={noAvatart} alt="logo" width="40px" height="40px"/></figure>
//             <span>MarqueTech</span>
//         </div>
//     </header>


//     {/* User Main-Profile*/}
//     <section class="userProfile card">
//         <div class="profile">
//             <figure><img src={noAvatart} alt="profile" width="250px" height="250px"/></figure>
//         </div>
//     </section>


//     {/*  & Skills Section  */}
//     <section class="work_skills card">

//         {/* Work Contaienr  */}
//         <div class="work">
//             <h1 class="heading">work</h1>
//             <div class="primary">
//                 <h1>Spotify New York</h1>
//                 <span>Primary</span>
//                 <p>170 William Street <br> New York, NY 10038-212-315-51</br></p>
//             </div>

//             <div class="secondary">
//                 <h1>Metropolitan <br> Museum</br></h1>
//                 <span>Secondary</span>
//                 <p>S34 E 65th Street <br> New York, NY 10651-78 156-187-60</br></p>
//             </div>
//         </div>

//         {/* Skills Contaienr */}
//         <div class="skills">
//             <h1 class="heading">Skills</h1>
//             <ul>
//                 <li style="--i:0">Android</li>
//                 <li style="--i:1">Web-Design</li>
//                 <li style="--i:2">UI/UX</li>
//                 <li style="--i:3">Video Editing</li>
//             </ul>
//         </div>
//     </section>


//     {/* User Details Sections  */}
//     <section class="userDetails card">
//         <div class="userName">
//             <h1 class="name">Jeremy Rose</h1>
//             <div class="map">
//                 <i class="ri-map-pin-fill ri"></i>
//                 <span>New York, NY</span>
//             </div>
//             <p>Product Designer</p>
//         </div>

//         <div class="rank">
//             <h1 class="heading">Rankings</h1>
//             <span>8,6</span>
//             <div class="rating">
//                 <i class="ri-star-fill rate"></i>
//                 <i class="ri-star-fill rate"></i>
//                 <i class="ri-star-fill rate"></i>
//                 <i class="ri-star-fill rate"></i>
//                 <i class="ri-star-fill rate underrate"></i>
//             </div>
//         </div>

//         <div class="btns">
//             <ul>
//                 <li class="sendMsg">
//                     <i class="ri-chat-4-fill ri"></i>
//                     <a href="#">Send Message</a>
//                 </li>

//                 <li class="sendMsg active">
//                     <i class="ri-check-fill ri"></i>
//                     <a href="#">Contacts</a>
//                 </li>

//                 <li class="sendMsg">
//                     <a href="#">Report User</a>
//                 </li>
//             </ul>
//         </div>
//     </section>


//     {/* Timeline & About Sections  */}
//     <section class="timeline_about card">
//         <div class="tabs">
//             <ul>
//                 <li class="timeline">
//                     <i class="ri-eye-fill ri"></i>
//                     <span>Timeline</span>
//                 </li>

//                 <li class="about active">
//                     <i class="ri-user-3-fill ri"></i>
//                     <span>About</span>
//                 </li>
//             </ul>
//         </div>

//         <div class="contact_Info">
//             <h1 class="heading">Contact Information</h1>
//             <ul>
//                 <li class="phone">
//                     <h1 class="label">Phone:</h1>
//                     <span class="info">+11 234 567 890</span>
//                 </li>

//                 <li class="address">
//                     <h1 class="label">Address:</h1>
//                     <span class="info">S34 E 65th Street <br> New York, NY 10651-78 156-187-60</br></span>
//                 </li>

//                 <li class="email">
//                     <h1 class="label">E-mail:</h1>
//                     <span class="info">hello@rsmarquetech.com</span>
//                 </li>

//                 <li class="site">
//                     <h1 class="label">Site:</h1>
//                     <span class="info">www.rsmarquetech.com</span>
//                 </li>
//             </ul>
//         </div>

//         <div class="basic_info">
//             <h1 class="heading">Basic Information</h1>
//             <ul>
//                 <li class="birthday">
//                     <h1 class="label">Birthday:</h1>
//                     <span class="info">Dec 25, 2000</span>
//                 </li>

//                 <li class="sex">
//                     <h1 class="label">Gender:</h1>
//                     <span class="info">Male</span>
//                 </li>
//             </ul>
//         </div>
//     </section>
// </div>
// </div>
// )}
// export default Profile;

