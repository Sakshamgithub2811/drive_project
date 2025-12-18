const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../config/multer.config');
const fileModel = require('../models/files.model');
const authMiddleware = require('../middlewares/auth');

router.get('/testIndex',(req,res)=>{
    res.send('user testIndex router');
})

router.get('/home',authMiddleware,async(req,res)=>{

    // console.log("requser",req.user);

    const userFiles = await fileModel.find({
        user:req.user.userId
    })

    console.log(userFiles);

    res.render('home',{
        files:userFiles
    });

})

router.post('/upload',authMiddleware,upload.single('file'), async(req,res)=>{

    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname,
        user:req.user.userId
    })
    
    // res.send(req.file);
    res.json(newFile);


})


// router.get('/download/:path',authMiddleware,async(req,res)=>{
    // const loggedInUserId = req.user.userId;
    // const path = req.params.path;

    // const file = await fileModel.findOne({
    //     user: loggedInUserId ,
    //     path:path
    // })

    // if(!file){
    //     return res.status(401).json({
    //         message:"Unauthorized"
    //     })
    // }

//     res.download(file.path, file.filename);
// })
const path = require('path');

router.get('/download/:fileId', authMiddleware, async (req, res) => {
    const loggedInUserId = req.user.userId;
    const { fileId } = req.params;

    const file = await fileModel.findOne({
        _id: fileId,
        user: loggedInUserId
    });

    if (!file) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const filePath = path.resolve(file.path);

    res.download(filePath, file.originalname);
});


module.exports = router;