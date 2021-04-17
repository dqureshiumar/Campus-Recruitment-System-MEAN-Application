const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require('../config/database')
// User Schema
const UserSchema = mongoose.Schema({
    name : {
        type : String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    role: {
        type: String,
        default: 'student'
    },
    password : {
        type: String
    },
    codechef: {
        type: String
    },
    codeforces : {
        type: String
    },
    github: {
        type: String
    },
    linkedin: {
        type: String
    },
    portfolio: {
        type: String
    },
    hackerrank: {
        type: String
    }
});

const JobSchema = mongoose.Schema({
    company_name: {
        type: String
    },
    job_type : {
        type: String
    },
    position : {
        type : String
    },
    apply_by: {
        type: String
    },
    company_website: {
        type: String
    },
    salary: {
        type: String
    },
    skills: {
        type: String
    },
    company_reg : {
        type: String
    },
    description: {
        type: String
    },
    college_reg : {
        type: String
    },
    posted_on : {
        type: Date,
        default : Date.now()
    }
});
module.exports.User = mongoose.model('User', UserSchema);
module.exports.Job = mongoose.model('Job', JobSchema);

