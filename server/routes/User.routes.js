const express = require('express');
const router = express.Router();
const userController = require('../controller/User.Controller');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/users', userController.createUser); /* Criar um usuário */
router.get('/users', userController.findAllUsers);/* Achar Todos */
router.get('/users/:id', userController.findUserById);/* Achar pelo id */
router.patch('/users/:id', userController.updateUser);/* Update no usuário pelo id */
router.delete('/users/:id', userController.deleteUser);/* Deletar o usuário pelo id */

module.exports = router;