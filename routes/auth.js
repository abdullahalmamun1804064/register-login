const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/authController');


router.post('/registration', registerUser);
router.post('/signin', loginUser);


module.exports = router;
