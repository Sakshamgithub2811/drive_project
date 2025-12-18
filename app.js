const express = require('express');
const app = express();
const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send('Hello world saksham here ')
})

app.get('/register',(req,res)=>{
    res.render('register');
})


app.use('/',indexRouter);

app.use('/upload',(req,res)=>{
    res.send('uploading the file');
})

app.use('/file',indexRouter)

app.use('/user',userRouter);



app.listen(3000,()=>{
    console.log("server is running at 3000");
})