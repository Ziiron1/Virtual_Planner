const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Carregando as variáveis de ambiente
dotenv.config();

mongoose.set("strictQuery", true);

// Conectando ao banco de dados
mongoose.connect(process.env.URL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Importando o modelo de usuário
const User = require("../model/UserSchema");

const router = express.Router();

// Rota de login
router.post("/", async (req, res) => {
  // Verificando se as informações necessárias foram fornecidas
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // Procurando o usuário com o email fornecido
  const user = await User.findOne({ email: req.body.email });

  // Verificando se o usuário foi encontrado
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  // Comparando as senhas
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  // Verificando se as senhas são iguais
  if (!isMatch) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  // Gerando um token com as informações do usuário e uma chave secreta
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "1h" } // o token expira em 1 hora
  );

  // Retornando o token para o usuário
  return res.json({ token, id: user.id, name: user.name });
});

module.exports = router;
