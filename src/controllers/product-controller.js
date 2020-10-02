const repository = require('../repositories/product-ropository')
const logRepository = require('../repositories/log-repository')


exports.post = async (req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        })

        // Salva o log
        await logRepository.log({
            modulo: `Produto Insert`,
            dados: [{'name': req.body.name, 'proco': req.body.preco, 'descricao': req.body.descricao}]
        })

        res.status(201).send({
            message: `Produto cadastrado com sucesso.`
        })
    } catch(error) {
        
        // Salva o log
        await logRepository.log({
            modulo: `Produto Insert`,
            dados: [{'error': error}]
        })

        res.status(500).send({
            message: `Falha ao processar a requisição.`
        })
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await repository.getAll()
        res.status(200).send({
            quantidadeTotal: data.length,
            produtos: data
        })

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
        if(data == null)
            res.status(200).send({
                message: 'Nenhum produto encontrado para esse ID',
                produto: data
            })
        else
            res.status(200).send({
                message: 'Produto encontrado',
                produto: data
            })
         
    } catch(error) {
        res.status(500).send({
            message: `Erro ao tentar encontrar produto; ID mal formado.`,
            erro: error
        })
    }
};

exports.put = async (req, res) => {
    try {
        const id = req.params.productId
        const data = await repository.put(id, req.body)

        // Salva o log
        await logRepository.log({
            modulo: `Produto Update`,
            dados: [{'id': id, 'name': req.body.name, 'proco': req.body.preco, 'descricao': req.body.descricao}]
        })

        res.status(200).send({
            message: `Produto atualizado com sucesso.`,
            dados: data
        })
    } catch(error){

        // Salva o log
        await logRepository.log({
            modulo: `Produto Update`,
            dados: [{'error': error}]
        })

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

        // Salva o log
        await logRepository.log({
            modulo: `Produto Delete`,
            dados: [{'id': id}]
        })

        res.status(200).send({
            message: `Produto removido com sucesso.`
        })
    } catch(error) {
        
        // Salva o log
        await logRepository.log({
            modulo: `Produto Delete`,
            dados: [{'error': error}]
        })

        res.status(500).send({
            message: `Falha ao processar a raquisição.`,
            erro: error
        })
    }
};