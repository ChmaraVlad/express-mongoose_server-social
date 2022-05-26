// core
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = require('express').Router();

// users get all
router.get('/', (req, res) => {
    res.send('get all users');
});

// create user
router.post('/', (req, res) => {
    res.send('create user');
});

// user by id
router.get('/:id', (req, res) => {
    res.send('get user by id');
});

// update user
router.put('/:id', async (req, res) => {
    const {userId, isAdmin} = req.body
    const {id} = req.params

    if(userId === id || isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json('try update passsword letter')
            }
        }

        try {
            const user = await User.findByIdAndUpdate(id, {$set: req.body})

            if(user === null) {
                res.status(400).json('User not found. Check userId')
            } 
            
            user && res.status(201).json('Account has been updated')
        } catch (error) {
            res.status(500).json('try update user letter')
        }
        
    } else {
        return res.status(403).json('You can update only your account!')
    }
});

// delete user
router.delete('/:id', (req, res) => {
    res.send('user page');
});

module.exports = router;