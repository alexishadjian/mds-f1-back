const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtMiddleWare = require('../middlewares/jwtMiddleware');


router
    .route('/register')
    .post(userController.userRegister)


router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/:id_user')
    .put(jwtMiddleWare.verifyToken, userController.userUpdate)
    .delete(jwtMiddleWare.verifyToken, userController.userDelete)

router
    .route('/:id_user/timer')
    .post(userController.userTimer)

module.exports = router;