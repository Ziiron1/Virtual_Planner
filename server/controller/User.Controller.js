const User = require('../model/UserSchema');
const bcrypt = require("bcryptjs");
// const { uuid } = require("uuidv4");

/* exports.createUser = (req, res) => {
    const user = new User({
        id: uuid(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        endereco: {
            rua: req.body.rua,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            pais: req.body.pais,
            cep: req.body.cep
        }
    });

    user
        .save()
        .then((result) => {
            res.status(201).json({
                message: "User created successfully",
                user: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
}; */

exports.findAllUsers = (req, res) => {
    User.aggregate([
        {
            $lookup: {
                from: "planners",
                localField: "id",
                foreignField: "user_Id",
                as: "planners",
            },
        },
        {
            $project: {
                id: 1,
                name: 1,
                email: 1,
                password: 1,
                isAdmin: 1,
                endereco: 1,
                planners: { conteudo: 1, title: 1, diaHoraAdicionado: 1, comentarios: 1 },
            },
        },
    ])
        .then((result) => {
            res.status(200).json({
                message: "User list",
                users: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.findUserById = (req, res) => {
    User.aggregate([
        {
            $lookup: {
                from: "planners",
                localField: "id",
                foreignField: "user_Id",
                as: "planners",
            },
        },
        {
            $project: {
                name: 1,
                email: 1,
                isAdmin: 1,
                endereco: 1,
                planners: { conteudo: 1, title: 1, diaHoraAdicionado: 1, comentarios: 1 },
            },
        },
    ])
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.status(200).json({
                message: "User found",
                user: result[0],
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};


exports.updateUser = (req, res) => {
    const id = req.params.id;
    const updateOps = req.body;

    if (updateOps.password) {
        updateOps.password = bcrypt.hashSync(updateOps.password, 8);
    }

    User.updateOne({ _id: id }, { $set: updateOps })
        .then((result) => {
            res.status(200).json({
                message: "User updated",
                result: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json({ "msg": "Usuário excluído com sucesso" }))
        .catch((err) =>
            res.status(404).json({ "nouserfound": "Nenhum usuário encontrado com esse ID" })
        );
};