const express = require('express');
const router = express.Router();
const userController = require('../controller/Planner.Controller');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/', userController.CreatePlanner); /* Criar um usuário */
router.get('/', userController.findAllPlanners);/* Achar Todos */
router.get('/:id', userController.findPlannerById);/* Achar pelo id */
router.patch('/:id', userController.UpdatePlanner);/* Update no usuário pelo id */
router.delete('/:id', userController.DeletePlanner);/* Deletar o usuário pelo id */

module.exports = router;