const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/signup', [
    check('name', "Name is required").not().isEmpty(),
    check('email', "Enter a valid Email").isEmail(),
    check('contact', "Contact number must be of 10 digits").isLength({ min: 10, max: 10 }),
    check('password', "Password must be minimum of 8 digits").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, contact, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists." });
        }

        user = new User({ name, email, contact, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }
});

module.exports = router;
