const Admin = require("../model/AdminSchema")
const { v4: uuidv4 } = require("uuid");

// Create
exports.createAdmin = (req, res) => {
    const admin = new Admin({
        IDAdmin: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    admin
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'Admin criado com sucesso',
                result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

// Read
exports.findAdminById = (req, res) => {
    const id = req.params.id;

    Admin.findOne({ IDAdmin: id })
        .then((result) => {
            res.status(200).json({
                message: 'Admin encontrado',
                admin: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.findAllAdmins = (req, res) => {
    Admin.find()
        .then((result) => {
            res.status(200).json({
                message: 'Lista de admins',
                result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

// Update
exports.updateAdmin = (req, res) => {
    const id = req.params.id;
    const updateOps = req.body;

    Admin.updateOne({ IDAdmin: id }, { $set: updateOps })
        .then((result) => {
            res.status(200).json({
                message: 'Admin atualizado',
                result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

// Delete
exports.deleteAdmin = (req, res) => {
    const id = req.params.id;

    Admin.deleteOne({ IDAdmin: id })
        .then((result) => {
            res.status(200).json({
                message: 'Admin excluído',
                result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};
