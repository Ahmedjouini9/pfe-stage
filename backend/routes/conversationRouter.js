const router = require('express').Router()
const convCtrl = require('../controllers/ConversationCntrl')
const auth = require('../middleware/auth')
// const authAdmin = require('../../middleware/authAdmin')

router.post('/forgot', convCtrl.create)

router.get('/:userId', auth, convCtrl.userConv)

router.get('/find/:firstUserId/:secondUserId', convCtrl.usersConv)


module.exports = router