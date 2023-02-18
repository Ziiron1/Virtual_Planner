const express = require('express');
const router = express.Router();
const userController = require('../controller/User.Controller');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // permite enviar cookies
}));

router.get('/', userController.findAllUsers);/* Achar Todos */
router.get('/:id', userController.findUserById);/* Achar pelo id */
router.patch('/:id', userController.updateUser);/* Update no usuário pelo id */
router.delete('/:id', userController.deleteUser);/* Deletar o usuário pelo id */

module.exports = router;