const router = require('express').Router()
const msgCtrl = require('../controllers/MessageCntrl')
// const auth = require('../../middleware/auth')
// const authAdmin = require('../../middleware/authAdmin')

router.post('/forgot', msgCtrl.create)

router.get('/:conversationId', msgCtrl.Msgs)


module.exports = router;