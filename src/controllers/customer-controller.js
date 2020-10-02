const repository = require('../repositories/customer-repository')
const logRepository = require('../repositories/log-repository')



exports.post = async (req, res) => {
    try {
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        // Salva o log
        await logRepository.log({
            modulo: `Customer Insert`,
            dados: [{'name': req.body.name, 'email': req.body.email, 'password': req.body.password}]
        })

        res.status(201).send({
            message: `Customer cadastrado com sucesso.`
        })
    } catch(error) {

        // Salva o log
        await logRepository.log({
            modulo: `Customer Insert`,
            dados: [{'error': error}]
        })

        res.status(500).send({
            message: `Falha ao processar a requisição.`
        })
    }

}

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
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.customerId
        const data = await repository.getById(id)

        if(data == null)
            res.status(200).send({
                message: 'Nenhum customer encontrado para esse ID',
                customer: data
            })
        else
            res.status(200).send({
                message: 'Customer encontrado',
                customer: data
            })

    } catch(error) {
        res.status(500).send({
            message: `Erro ao tentar encontrar o customer; ID mal formado.`,
            erro: error
        })
    }
}

exports.put = async (req, res) => {
    try {
        const id = req.params.customerId
        const data = await repository.put(id, req.body)
        res.status(200).send({
            message: `Customer atualizado com sucesso.`,
            dados: data
        })

        // Salva o log
         await logRepository.log({
            modulo: `Customer Update`,
            dados: [{ 'id': id, 'name': req.body.name, 'email': req.body.email, 'password': req.body.password}]
        })

    } catch(error){

        // Salva o log
        await logRepository.log({
            modulo: `Customer Update`,
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
        const id = req.params.customerId
        await repository.delete(id)
        res.status(200).send({
            message: `Customer removido com sucesso.`
        })

        // Salva o log
        await logRepository.log({
            modulo: `Customer Delete`,
            dados: [{'id': id}]
        })

    } catch(error) {

        // Salva o log
        await logRepository.log({
            modulo: `Customer Delete`,
            dados: [{'error': error}]
        })

        res.status(500).send({
            message: `Falha ao processar a raquisição.`,
            erro: error
        })
    }
};

exports.customerRegister = async (req, res) => {
    try {
        await repository.register(req.body.name, req.body.email, req.body.password)

        // Salva o log
        await logRepository.log({
            modulo: `Customer Register`,
            dados: [{'name': req.body.name, 'email': req.body.email, 'password': req.body.password}]
        })

        res.status(201).json({
            message: `Usuário registrado com sucesso.`
        })
    } catch(error) {
        
        // Salva o log
        await logRepository.log({
            modulo: `Customer Register`,
            dados: [{'error': error}]
        })

        res.status(500).json({
            message: `Erro ao tentar criar um novo usuário. ${error.message}`
        })
    }
}