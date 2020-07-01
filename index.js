const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const userRouter=require('./route/user');
const blogRouter=require('./route/blog');
const uploadRouter=require('./route/upload');
const morgan=require('morgan');

const app=express();
require('dotenv/config');
const auth=require('./auth');
app.use(morgan('tiny'));
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL,{ useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then((db)=>{
      console.log("Connected to Server")
},(err)=>console.loge(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user',userRouter);
app.use('/blog',blogRouter);
app.use('./upload',uploadRouter);
app.use(auth.verifyUser);
app.listen(process.env.PORT,()=>{
    console.log(`App is running at ${process.env.PORT}`);
});