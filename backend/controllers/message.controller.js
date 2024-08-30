import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async(req,res)=>{
    //console.log("message sent",req.params.id)
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,receiverId,message
        })

        if(newMessage){
            conversation.message.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
         await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json({newMessage})

    } catch (error) {
        console.log("Error in sendmessage controller : ",error.message );
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessage = async(req,res)=>{
    try {
         const {id:userToChatId}=req.params;
         const senderId=req.user._id;

         const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
         }).populate("message");// populate is not reference but it is the actual message

         if(!conversation) return res.status(200).json([])

         const message = conversation.message;

         res.status(200).json(message);
    } catch (error) {
        console.log("Error in getmessage controller : ",error.message );
        res.status(500).json({error:"Internal server error"});
    }
};