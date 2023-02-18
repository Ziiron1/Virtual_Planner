const Planner = require("../model/PlannerSchema");
const { v4: uuidv4 } = require("uuid");

exports.CreatePlanner = (req, res) => {
  const userID = req.body.userID;
  const planner = new Planner({
    id: uuidv4(),
    user_Id: userID,
    rotulo: req.body.rotulo,
    diaHoraAdicionado: req.body.diaHoraAdicionado,
    conteudo: req.body.conteudo,
    comentarios: req.body.comentarios,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    events: req.body.events,
  });

  planner
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Planner criado com sucesso",
        planner: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.findUserPlanners = (req, res) => {
  try {
    const userId = req.params.user_Id;
    Planner.find({ user_Id: userId })
      .then((planners) => {
        res.status(200).json({
          message: "Planners found for user",
          planners: planners,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error finding planners for user",
          error: error,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding user planners" });
  }
};

exports.findAllPlanners = (req, res) => {
  Planner.find()
    .then((result) => {
      res.status(200).json({
        message: "Planner list",
        planners: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.findPlannerById = (req, res) => {
  const id = req.params.id;

  Planner.findOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "Planner found",
        planner: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.UpdatePlanner = (req, res) => {
  const id = req.params.id;
  const updateOps = req.body;

  Planner.update({ _id: id }, { $set: updateOps })
    .then((result) => {
      res.status(200).json({
        message: "Planner updated",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.DeletePlanner = (req, res) => {
  Planner.findByIdAndDelete(req.params.id)
    .then((user) => res.json({ msg: "Planner excluído com sucesso" }))
    .catch((err) =>
      res
        .status(404)
        .json({ noplannerfound: "Nenhum Planner encontrado com esse ID" })
    );
};
