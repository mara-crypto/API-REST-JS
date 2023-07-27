const express = require('express');
const router = express.Router();

const userRoute = require('../controllers/userController')

router.post('/login', userRoute.login);
router.get('/', userRoute.getUser);

module.exports = router;