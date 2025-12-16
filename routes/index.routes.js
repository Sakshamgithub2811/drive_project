const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads'});

router.get('/testIndex',(req,res)=>{
    res.send('user testIndex router');
})

router.get('/home',(req,res)=>{
    res.render('home');
})

router.post('/upload',upload.single('file'),(req,res)=>{

    console.log(req.file);
    res.send(req.file)
})

module.exports = router;