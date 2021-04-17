const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config/database')
const {
    RegisterUser,
    ShowProfile,
    LoginUser,
    AllPlacements, 
    AddPlacement
} = require('../controllers/user');
// Register Routes
router.post('/register',RegisterUser);
// Authenticate
router.post('/authenticate',LoginUser);
// Profile
router
    .get('/profile',passport.authenticate('jwt', {session :false}),ShowProfile)

router
    .get('/placements-listings',AllPlacements);

router.post('/placements',passport.authenticate('jwt', {session :false}),AddPlacement);

module.exports = router;