const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/test',(req,res)=>{
    res.send('user test route');
});

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
   
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }
        const { email,username,password } = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await userModel.create({
            email,
            username,
            password:hashPassword
        })
        res.json(newUser);
        console.log('Hello_1');
});

router.get('/login',async(req,res)=>{
    res.render('login');
});

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:'Invalid data'
            })
        }
        console.log(req.body);

        const { username, password } = req.body;


        const user = await userModel.findOne({
            username:username
        });

        console.log(user);

        if(!user){
            return res.status(400).json({
                message:'usernamesaksham or password is incorrect',
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);
        if(!isMatch){
            return res.status(400).json({
                message:'username shrivastava or password is incorrect'
            })
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
            process.env.JWT_SECRET,
        );

        res.cookie('token',token);

        res.send('Logged In');
})

module.exports = router;
