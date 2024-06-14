const express = require("express");
const Student = require("../model/Student");
const mongoose = require("mongoose");
const router = express.Router();
const auth=require('../middleware/check-auth');

//display or getting data from database      & check the authorization of it
router.get("/",auth, (req, res, next) => {
  //res.status(200).send("helllo")
  // res.status(200).json({
  //     message:"student get request"
  // })

  Student.find()
    .then((result) => {
      res.status(200).json({
        StudentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Find by Id 
router.get('/:id',(req,res,next)=>{
  Student.findById(req.params.id)
  .then(result=>{
    res.json({
      onestudent:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.json({
      error:err
    })
  })
});

//Adding new reord of student 
router.post("/", async (req, res, next) => {
  //res.status(200).send("helllo")
  // res.status(200).json({
  //     message:"student post request"
  // })
  console.log(req.body);
  // aading new record
  const student = new Student({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  student.save() // saving the record
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    //catching the eror if data type is invalid
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  // const student=new Student(req.body);
  // const result=await student.save()
  // res.send(result)
});

// delete a record
router.delete('/:id',(req,res,next)=>{
  Student.remove({_id:req.params.id}) // remove is not working instead of it we use deleteOne
  .then(result=>{
    res.status(200).json({
      message:"record is deleted",
      result:result
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
});

// update request
router.put('/:id',(req,res,next)=>{
  Student.findOneAndUpdate(
    {_id:req.params.id},
    {$set:{
      name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    }}
  )
  .then(result=>{
    res.json({
      updated_data:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.json({
      error:err
    })
  })
})

module.exports = router;
