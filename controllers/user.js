const { User } = require('../models/user');
const { Job } = require('../models/user');
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const RegisterUser = async (req, res) => {
    // {
    //     "name":"Rishabh",
    //     "email":"rishabhsingh054@gmail.com",
    //     "username":"risingh",
    //     "password":"Rishabh@0902"
    // }
    //Check if User Exists
    const exist_user = await User.findOne({username:req.body.username}, function(err,docs){
        if (err){
            return res.json({ success : false, msg: "User Not Found", err: err});
        }
        console.log(err);
    });
    if(exist_user != null){
        return res.json({ success : false, msg: "User Already Exists"});
    }
    else{
        //console.log(req.body);
        const newUser =  new User({
            name: req.body.name,
            email : req.body.email,
            username : req.body.username,
            password: req.body.password,
            linkedin: req.body.linkedin,
            github: req.body.github,
            portfolio: req.body.portfolio,
            codechef: req.body.codechef,
            codeforces: req.body.codeforces,
            hackerrank: req.body.hackerrank,
            role: req.body.role
        });
        await newUser.save();
        return res.json({
            success: true,
            message: 'User Registered Successfully.',
            user : newUser
        });
    }
}

const LoginUser = async (req, res) => {
    // {
    //     "username":"dqureshiumar",
    //     "password":"Iamumar@2901"
    // }
    const user = await User.findOne({username :req.body.username}, function(err,docs){
        if (err){
            return res.json({ success : false, msg: "User Not Found", err: err});
        }
        //console.log(err);
    });
    //console.log(user);
    if(user == null){
        return res.json({ success : false, msg: "User Not Found"});
    }
    //console.log(user);
    if(user.password === req.body.password){
            const token = jwt.sign({user}, config.secret, {
                expiresIn: 604800 // 1 Week
            });
            return res.json({
                success: true,
                token: 'JWT '+token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
    }
    else{
        return res.json({ success : false, msg: "Invalid Password"});
    }
}

const ShowProfile = async (req, res) => {

    return res.json({
        profile : req.user
    });
}

const UpdateProfile = async (req, res) => {

    const id = req.user._id;

    const profile = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({profile});

}

const AddPlacement = async (req, res) => {
    var user = req.user;
    if(user.role === 'admin'){
        const newJob = new Job(req.body);
        await newJob.save();
        return res.json({
            success: true,
            newJob: newJob,
            message: "Job Added Successfully"
        })
    }
    else{
        return res.json({
            success: false,
            message: "Invalid User"
        })
    }
}
const AllPlacements = async (req, res) => {
    const placements = await Job.find().sort({_id:-1});
    return res.json({
        success: true,
        placements: placements
    });

}


module.exports = {
    ShowProfile,
    UpdateProfile,
    AllPlacements,
    RegisterUser,
    LoginUser,
    AddPlacement
}