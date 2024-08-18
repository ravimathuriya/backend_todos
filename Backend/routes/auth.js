const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const seccode = "my name is sheela";
const fetchuser = require("../middleware/fetchuser")






//Route 1 : creating a user using post request. authentication not require
router.post('/createuser',
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {

        try {
            let success = false;
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
                
            }

            //check if user already exist 
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "already existed this mail" })
            }

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);


            //create a user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass,
            })


            const data = {
                user:
                {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, seccode);


            //send authtoken
            success=true;
            res.json({success, authtoken: authtoken });
        }

        catch (error) {
            console.log(error, "Internal error occured")
        }
    })


//Route 2 : creating a loginpoint and send authtoken

router.post('/login',
    body('email').isEmail(),
    body('password').exists(),
    async (req, res) => {

        try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            let success= false;
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            //check if user does not have account
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct details" })
            }

            //compare the password to logged on to website
            const comparepass = bcrypt.compareSync(password, user.password);
            if (!comparepass) {
                return res.status(400).json({ success, error: "Please try to login with correct details" })
            }

            const data = {
                user:
                {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, seccode);

            //send authtoken
            success = true;
            res.json({ success, authtoken: authtoken });
        }

        catch (error) {
            console.log(error, "Internal error occured")
        }
    })


//Route 3 : get user details using post request to "api/auth/getuser", login required (authtoken required)

router.post('/getuser',
    fetchuser,
    async (req, res) => {

        try {

            const userid = req.user.id;

            const user = await User.findById(userid).select("-password");

            res.send(user);

        }

        catch (error) {

            res.status(500).send("internal server error");
        }

    })


module.exports = router;