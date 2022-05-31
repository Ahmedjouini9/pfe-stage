const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/logout', userCtrl.logout)

router.post('/activation', userCtrl.activateEmail)

router.post('/refresh_token', userCtrl.getAccessToken)

router.get('/infor', userCtrl.getUserInfor)

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

router.patch('/update/:id', userCtrl.updateUser)

router.patch('/updatePassword/:id', userCtrl.updatePassword)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)


// Social Login
router.post('/google_login', userCtrl.googleLogin)

// router.post('/facebook_login', userCtrl.facebookLogin)

module.exports = router