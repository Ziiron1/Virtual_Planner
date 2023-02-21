const express = require('express');
const router = express.Router();
const userController = require('../controller/Admin.Controller');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // permite enviar cookies
}));

router.post('/', userController.createAdmin);
router.get('/', userController.findAllAdmins);
router.get('/:id', userController.findAdminById);
router.patch('/:id', userController.updateAdmin);
router.delete('/:id', userController.deleteAdmin);

module.exports = router;