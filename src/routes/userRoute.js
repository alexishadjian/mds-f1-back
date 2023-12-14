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
    .route('/:user_id')
    .all(jwtMiddleWare.verifyToken)
    .put(userController.userUpdate)
    .delete(userController.userDelete)

router
    .route('/:user_id/timer')
    .get(jwtMiddleWare.verifyToken, userController.getAllUserTime)
    .post(jwtMiddleWare.verifyToken, userController.userTimer)

router
    .route('/:user_id/timer/avg')
    .get(jwtMiddleWare.verifyToken, userController.getUserTimeAvg)

module.exports = router;