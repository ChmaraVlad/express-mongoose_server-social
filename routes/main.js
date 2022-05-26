const router = require('express').Router();

// route
const userRoute = require('./user')
const authRoute = require('./auth')

// define the home page route
router.get('/', (req,res) => {
    res.send('api page');
});

// define the users page route
router.use('/user', userRoute
);

// define the auth page route
router.use('/auth', authRoute
);

module.exports = router;