const Customer = require('../app/models/customer');

exports.post = function(req, res) {
    const customer = new Customer();
    customer.name = req.body.name;
    customer.email = req.body.email;
    customer.password = req.body.password;

    customer.save(function(error){
        if(error)
            res.send(`Erro ao tentar salvar um novo customer  ${error}`);
        
        res.status(201).json({message: 'customer inserido com sucesso'});
    });
}

exports.getAll = function(req, res) {
    Customer.find(function(err, customers){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os produtos",
            allProducts: customers
        });
    });
}

exports.getById = function(req, res) {
    const id = req.params.customerId;
    Customer.findById(id, function(err, customer){
        if (err){
            res.status(500).json({
                message: "Erro ao tentar encontrar customer; ID mal formado"
            });
        }else if(customer == null){
            res.status(400).json({
                message: "customer não encontrado para o id passado"
            });
        }else{
            res.status(200).json({
                message: "customer encontrado",
                produto: customer
            });
        }
    });
}