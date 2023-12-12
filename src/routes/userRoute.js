const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router
    .route('/register')
    .post(userController.userRegister)


router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/:id_user')
    .put(userController.userUpdate)
    .delete(userController.userDelete)

module.exports = router;