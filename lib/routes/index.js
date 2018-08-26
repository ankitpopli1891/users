let express = require('express');
let router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

// todo:
// explore more readable patterns
// !!! require('./users')(router);
router.use('/users', require('./users'));

// todo
// router.use('/friends', require('./friends'));

module.exports = router;
