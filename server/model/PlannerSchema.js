const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  user_Id: {
    type: String,
    required: true,
  },
  rotulo: {
    type: String,
    required: true,
  },
  diaHoraAdicionado: {
    type: Date,
    required: true,
    default: Date.now,
  },
  conteudo: {
    type: String,
    required: false,
  },
  comentarios: {
    type: [String],
    default: [],
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataFim: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("planners", plannerSchema);
