const repository = require('../repositories/product-ropository')


exports.post = async (req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        })
        res.status(201).send({
            message: `Produto cadastrado com sucesso.`
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            message: `Falha ao processar a requisição.`
        })
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await repository.getAll()
        res.status(200).send(data)

    } catch(error) {
        res.status(500).send({
            message: `Falha ao processar a requisição.`,
            erro: error
        })
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.productId
        const data = await repository.getById(id)
        res.status(200).send(data)
    } catch(error) {
        res.status(500).send({
            message: `Falha ao processar requisição.`,
            erro: error
        })
    }
};

exports.put = async (req, res) => {
    try {
        const id = req.params.productId
        const data = await repository.put(id, req.body)
        res.status(200).send({
            message: `Produto atualizado com sucesso.`,
            dados: data
        })
    } catch(error){
        res.status(500).send({
            message: `Falha ao processar a requisição.`,
            erro: error
        })
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.productId
        await repository.delete(id)
        res.status(200).send({
            message: `Produto removido com sucesso.`
        })
    } catch(error) {
        res.status(500).send({
            message: `Falha ao processar a raquisição.`,
            erro: error
        })
    }
};