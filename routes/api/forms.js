const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Form = require('../../models/Form');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// Works
// @route POST api/forms
// @desc Create a form
// @access Private
router.post('/',[ auth, 
    check('question', 'Question is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newForm = new Form({
            question : req.body.question,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const form = await newForm.save();
        res.json(form);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Works
// @route GET api/forms
// @desc Get all forms
// @access Private
router.get('/', auth, async(req, res) => {
    try {
        const forms = await Form.find({user : req.user.id}).sort({date: -1});
        return res.json(forms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// Works
// @route GET api/forms/:id
// @desc Get form by id
// @access Private
router.get('/:id', auth , async(req, res) => {
    try {
        const form = await Form.findById(req.params.id);

        if(!form){
            return res.status(404).json({ msg : 'Form not found'});
        }

        return res.json(form);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Form not found'});
        };
        return res.status(500).send('Server error');
    }
});

// Works
// @route DELETE api/forms/:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        
        if(!form){
            return res.status(404).json({ msg : 'Form not found'});
        }

        // Check on the user
        if(form.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorised"});
        }
        await form.remove();
        return res.json({ msg : "Post removed"});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        };
        res.status(500).send('Server error');
    }
})

module.exports = router;