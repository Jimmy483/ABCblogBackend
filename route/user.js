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
            fName: req.body.fName,
            lName: req.body.lNname,
            username: req.body.username,
            phoneno:req.body.phoneno,
            password: hash,
            image: req.body.image
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
                        res.json({ status: 'Login successful', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, fName: req.user.fName, lName: req.user.lName, username: req.user.username});
    
});

module.exports=router;