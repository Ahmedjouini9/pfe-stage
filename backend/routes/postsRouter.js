const router = require('express').Router()
const Post = require('../models/Post');
const Company = require('../models/company');


//update Poste's company
router.put('/:id', async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    if(post.companyId === req.body.companyId){  
        await post.updateOne({$set : req.body})
        res.status(200).json('post has been updated')
    }else {
        res.status(403).json('you can only update your post')
    }
}catch(err){
    res.status(500).json(err)
}
})
//delete Poste
router.delete('/:id', async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    if(post.companyId === req.body.companyId){  
        await post.deleteOne()
        res.status(200).json('post has been deleted')
    }else {
        res.status(403).json('you can only delete your post')
    }
}catch(err){
    res.status(500).json(err)
}
})


//get company's all posts
router.get('/company/:companyName',async(req,res)=>{
    try{
        const company = await Company.findOne({companyName : req.params.companyName})
        const posts = await Post.find({companyId  : company._id})
        res.status(200).json(posts)
        
    }catch(err){
        res.status(500).json(err)
    }
    
//admin    
//get post
    router.get('/:id', async(req,res)=>{
        try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
    })
})
//Create poste
router.post('/' , async(req , res)=>{
    const newPost = Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch (err){
        res.status(500).json(err)
    }
})
//delete post
router.delete('/admin:id', async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id) 
        await post.deleteOne()
        res.status(200).json('post has been deleted')
    
}catch(err){
    res.status(500).json(err)
}
})
//update post
router.put('/admin:id', async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
        await post.updateOne({$set : req.body})
        res.status(200).json('post has been updated')
    
}catch(err){
    res.status(500).json(err)
}
})
//get all posts
router.get('/admin/allpost', async (req,res) => {
    try{
       await Post.find().then(post => {
            res.json(post);
            console.log(post);
        })
    }catch{
        res.status(500).json(err);
    }
})

module.exports = router;
