const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validator = require('validator')
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const validEmail = validator.isEmail(email)
        if (!validEmail) return res.status(400).json({
            message: "Invalid email format"
        })
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({
            message: 'Invalid email or password'
        });
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(400).json({
            message: 'Invalid email or password'
        });



        const token = generateToken(user)
        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

};
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const validEmail = validator.isEmail(email)
        if (!validEmail) return res.status(400).json({
            message: "Invalid email format"
        })
        const existing = await User.findOne({ email: email });
        if (existing) return res.status(400).json({
            message: 'Email already registered'
        });
        const salt = await bcrypt.genSalt(6);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name: name, email: email, password: hashedPassword
        });

        const token = generateToken(user)
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

};


module.exports = {
    register,
    login
}