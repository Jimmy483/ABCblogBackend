const express=require('express');
const router=express.Router();
const Blog=require('../model/blog');

router.post('/create',(req,res,next)=>{
    Blog.create({
        title:req.body.title,
        blog:req.body.blog
    })
    .then(blog=>{
        res.send(blog)
    })
    .catch(next);
})

router.get('/getblogs',(req,res,next)=>{
    Blog.find()
    .then((blog)=>{
        if(blog==null)
        {
            let err=new Error('No blogs found');
            err.status=401;
            return next(err);
        }
        else{
            res.send(blog);
        }
    }).catch(next);
})

router.put('/update/:id',(req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((blog) => {
                if (blog == null) throw new Error("Unable to find the blog");
                res.json(blog);   
            }).catch(next);
            
    });

    router.delete('/remove/:id',(req,res,next)=>{
        Blog.deleteOne({_id:req.params.id})
        .then(blog=>{
            console.log(blog);
            res.send(blog);
        }).catch(next);
    })
module.exports=router;