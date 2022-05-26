const bcrypt = require('bcrypt')

const router = require('express').Router();
const User = require('../models/User')

// auth
router.get('/', async (req, res) => {
    res.send('auth');
});

// register
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)
    
    try {
        const newUser = new User({
            username,
            email,
            password: hasedPassword
        })

        const user = await newUser.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).json(error)
    }
});

// login
router.post('/login', async (req, res) => {
    const {email, password} = req.body
        
    try {
        const user = await User.findOne({email })

        if(user) {            
            const validPassword = await bcrypt.compare(password, user.password)

            if( !validPassword) {
                res.status(400).json('wrong password')
            } else {
                res.status(201).send(user)
            }

        } else {
            res.status(404).json('user not found')
        }

    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;