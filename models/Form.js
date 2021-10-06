const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    question : {
        type: String,
        required: true
    },
    responses : [
        {text : {
                type : String,
                required : true
                }
        }],
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('form', FormSchema);
