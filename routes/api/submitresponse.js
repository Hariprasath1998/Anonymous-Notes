const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Form = require('../../models/Form');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// Works
// @route GET api/submitresponse/:id
// @desc Get form by id
// @access Public
router.get('/:id' , async(req, res) => {
    try {
        const { question } = await Form.findById(req.params.id);

        if(!question){
            return res.status(404).json({ msg : 'Form not found'});
        }
        return res.json({question});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg : 'Form not found'});
        };
        return res.status(500).send('Server error');
    }
});


// @route POST api/submitresponse/:id
// @desc Respond to form
// @access Public
router.post('/:id',
    [ 
    check('text', 'Text is required').not().isEmpty()
    ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const form = await Form.findById(req.params.id);
        const newResponse = {
            text : req.body.text
        };

        form.responses.unshift(newResponse);

        await form.save();

        return res.json({ msg : "Response Recorded"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


module.exports = router;