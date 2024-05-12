const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },
    email: {
        type: String,
        unique: [true, 'This email is already in use'],
        required: [true, 'Please provide your email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        validate: {
            validator: function (v) {
                // Password must contain at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special character
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{6,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password. It must contain at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special character`,
        },
    },
});

module.exports = mongoose.model('User', userSchema);
