const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Form = require('../../models/Form');
const auth = require('../../middleware/auth');



// WORKS
// CREATE USER
// @route POST api/users
// @desc Authenticate User & get token
// @access Public
router.post('/', [
    check('userid', 'User ID is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    // Destructuring data from the request body object
    const { userid, password } = req.body;
    try{
        let user = await User.findOne({ userid });
        
        if(user){
            return res.json({ errors : [ { msg : 'User already exists' } ] })
        }

        user = new User({
            userid,
            password
        })
        
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id : user.id
            }
        }

        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn : 360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token })
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});


// @INCOMPLETE
// @route  DELETE api/users
// @desc   Delete user and forms
// @access Private
router.delete('/', auth, async (req, res) => {
    try {

        // Remove Profile
        // await Form.deleteMany({userid: req.user.id});
        const forms = Form.find({user : req.user.id});
        await forms.remove();
        await User.findOneAndRemove({userid: req.user.id});

        res.json({ msg : 'User deleted'});
    } catch (err) {

        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;