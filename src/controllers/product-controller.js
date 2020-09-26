const Produto = require('../app/models/product');


exports.post = function (req, res) {
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    // console.log(req.body);

    produto.save(function(error){
        if(error)
            res.send(`Erro ao tentar salvar um novo produto  ${error}`);
        
        res.status(201).json({message: 'produto inserido com sucesso'});
    });
};

exports.getAll = function(req, res){
    Produto.find(function(err, prods){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os produtos",
            allProducts: prods
        });
    });
};

exports.getById = function(req, res){
    const id = req.params.productId;
    Produto.findById(id, function(err, produto){
        if (err){
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formado"
            });
        }else if(produto == null){
            res.status(400).json({
                message: "produto não encontrado para o id passado"
            });
        }else{
            res.status(200).json({
                message: "produto encontrado",
                produto: produto
            });
        }
    });
};


exports.put =  function(req, res){
    const id = req.params.productId;
    console.log(id)
    Produto.findById(id, function(err, produto){
        if(err){
            res.status(500).json({
                message:"Erro ao tentar encontrar produto; Id mal formado"
            });
        }else if(produto == null){
            res.status(400).json({
                message: "produto não encontrado para o Id passado"
            });
        }else{
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(function(error){
                if(error)
                    res.send(`Erro ao tentar atualizar o produto ${error}`);
                
                    res.status(200).json({
                        message: "produto atualizado com sucesso"
                    });
            });
        }
    });
};

exports.delete = function(req, res){
    Produto.findByIdAndRemove(req.params.productId, (err, produto) => {
        if(err) 
            res.status(500).send(`Erro ao deletar  ${err}`)

        const response ={
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
};