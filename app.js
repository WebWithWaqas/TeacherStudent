const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors')


const student=require('./api/routes/student');
const Teacher=require('./api/routes/Teacher')


const bodyParser=require("body-parser");
const app=express();

// mongoose.connect("mongodb+srv://WaqasPractice:test123@cluster0.uke4ttg.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect("mongodb://127.0.0.1:27017/Student_File1")
mongoose.connection.on('error',error=>{
    console.log('Connection Fail');
});
mongoose.connection.on('connected',connected=>{
    console.log('Connected With Database . . . ')
})

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/students',student)
// app.use('/teacher',Teacher)
// if there is anotther route hit or bad route is ther then error message for that is 
app.use((req,res,next)=>{
    res.status(404).json({
        error:"bad url request"
    })
});

module.exports=app;