const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../config/multer.config');
const fileModel = require('../models/files.model');

router.get('/testIndex',(req,res)=>{
    res.send('user testIndex router');
})

router.get('/home',(req,res)=>{
    res.render('home');
})

router.post('/upload',upload.single('file'), async(req,res)=>{

    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname
    })
    
    // res.send(req.file);
    res.json(newFile);


})

module.exports = router;