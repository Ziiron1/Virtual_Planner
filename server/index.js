const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./routes/User.routes");
const Planner = require("./routes/Planner.routes");
const Admin = require("./routes/Admin.routes");
const LoginRoute = require("./function/login");
// const authMiddleware = require("./middleware/token")
const RegisterRoute = require("./function/register");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // permite enviar cookies
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.URL_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
}

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/react", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use("/login", LoginRoute);
app.post('/register', RegisterRoute.createUser)

app.use("/users",/*  authMiddleware, */ User);
app.use("/planner",/*  authMiddleware, */ Planner);
app.use("/admin",/*  authMiddleware, */ Admin);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


/* Rota /users , mostra os dados dos usuarios e uma pequena informação de cada planner que o usuario tem.
   Rota /planner , mostra as informações completas de cada planner existente.
   Rota /users/:id , mostra os dados dos usuarios específico e uma pequena informação sobre os planners.
   Rota /planner/user/:id , mostra os dados dos planners que existem no id do usuário fornecido.
*/