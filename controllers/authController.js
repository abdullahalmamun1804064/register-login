const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const fs = require('fs');
const path = require('path');
const authDataFilePath = path.join(__dirname, '../data/auth.json');
const authData = require('../data/auth.json');
const bcrypt = require('bcryptjs');
const { readAuthData } = require('../utils/readAuthData');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Assuming authData is an array of user objects in auth.json
    const existingUser = authData.find(user => user.email === email);
    if (existingUser) {
        return next(new ErrorHandler('User with this email already exists', 400));
    }

    const newUser = { name, email, phone, password: hashedPassword };
    authData.push(newUser);

    // Write the updated authData array back to the auth.json file
    fs.writeFileSync(authDataFilePath, JSON.stringify(authData, null, 4));

    res.status(201).json({
        success: true,
        user: newUser
    });
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Read user data from JSON file
    const authData = readAuthData();

    // Find user by email
    const user = authData.find(user => user.email === email);

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Compare entered password with hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Password is correct, return success response
    res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
            email: user.email,
            name: user.name // You can include other user details if needed
        }
    });
});
