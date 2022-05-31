const Message = require("../models/Message");

const MessageController = {
    //new mesg
    create : async (req,res)=>{
            try{
                const newMessage = new Message(req.body);
                    const savedMessage = await newMessage.save();
                    res.status(200).json(savedMessage);
            }catch(err){res.status(500).json({msg : err.message})}
    },
    Msgs : async (req,res)=>{
        try {
            const messages = await Message.find({
              conversationId: req.params.conversationId,
            });
            res.status(200).json(messages);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}

module.exports = MessageController;