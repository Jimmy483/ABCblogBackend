const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router=express.Router();
const auth=require('../auth');
const User=require('../model/user');


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password,10,function (err, hash) {
        if (err) {
            let err =  new Error('Unable to hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            username: req.body.username,
            password: hash,
            image: req.body.image,
            admin:req.body.admin
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup Successful", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                console.log(req.body.username);
                err.status = 401;
                console.log("helllo")
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match');
                            err.status = 401;
                            return next(err);
                        }
                    
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login successful', token: token, admin:user.admin });
                        console.log(user.admin);
                    }).catch(next);
            }
        }).catch(next);
})

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, Fname: req.user.Fname, Lname: req.user.Lname,username:req.user.username,password:req.user.password});
            
        }).catch(next);
       
});

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, Fname: req.user.Fname, Lname: req.user.Lname, username: req.user.username,password:req.user.password});
    
});

module.exports=router;