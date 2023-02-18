const User = require('../model/UserSchema');
const { uuid } = require("uuidv4");

exports.createUser = (req, res) => {
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
};