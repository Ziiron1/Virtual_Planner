const axios = require('axios');

exports.checkCep = (req, res) => {
    const cep = req.body.cep.replace(/\D/g, ''); // remove todos os caracteres não numéricos do CEP

    // realiza a requisição GET na API do CEP
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            const data = response.data;

            // verifica se o CEP é válido
            if (data.erro) {
                res.status(400).json({ error: 'CEP inválido' });
            } else {
                // CEP é válido, retorna os dados da localização
                res.status(200).json({
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    pais: 'Brasil',
                    cep: data.cep
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });
};