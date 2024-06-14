const express = require("express");
const mongoose = require("mongoose");
//importing bcrypt for password encryption
const bcrypt = require("bcrypt");
// importing jwt
const jwt = require("jsonwebtoken");
const Teacher = require("../model/Teacher");
const router = express.Router();

// sign Up
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const teacher = new Teacher({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        password: hash,
        phone: req.body.phone,
        email: req.body.email,
        userType: req.body.userType,
      });
      teacher.save()
        .then((result) => {
          res.status(200).json({
            new_teacher: result,
          });
        })
        .catch((err) => {
          console.log("something is wrong");
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

// login
router.post('/login',(req,res,next)=>{
  Teacher.find({username:req.body.username})
  .exec()
  .then(user=>{
    if(user.length < 1){
      return res.status(401).json({
        msg:"user not found"
      });
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(!result){
        res.status(401).json({
          message:"incorrect password"
        });
      }
      if(result){
        const token=jwt.sign({
          username:user[0].username,
          phone:user[0].phone,
          email:user[0].email,
          userType:user[0].userType
        },
        'e-comm',
        {
          expiresIn:"2h"
        }
        );
        res.status(200).json({
          username:user[0].username,
          phone:user[0].phone,
          email:user[0].email,
          userType:user[0].userType,
          token:token
        });
        console.log(token)
      }
    });
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    });
  });
});

module.exports = router;
