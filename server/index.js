const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectando ao banco de dados
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida.');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
