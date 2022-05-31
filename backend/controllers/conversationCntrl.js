const Conversation = require("../models/Conversation");

const ConversationController = {
    //new conv
    create : async (req,res)=>{
            try{
                const newConversation = new Conversation({
                    members: [req.body.senderId, req.body.receiverId],
                  });
                  try {
                    const savedConversation = await newConversation.save();
                    res.status(200).json(savedConversation);
                  } catch (err) {
                    res.status(500).json(err);
                  }
            }catch(err){res.status(500).json({msg : err.message})}
    },
    userConv : async (req,res)=>{
        try {
            const conversation = await Conversation.find({
              members: { $in: [req.params.userId] },
            });
            res.status(200).json(conversation);
          } catch (err) {
            res.status(500).json(err);
          }
        },
    usersConv : async (req,res)=>{
        try {
            const conversation = await Conversation.findOne({
              members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json(conversation)
          } catch (err) {
            res.status(500).json(err);
          }
        }
}
module.exports = ConversationController;
