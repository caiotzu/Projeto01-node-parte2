//Importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistência
    // conexao certa
    const connectionString = "mongodb+srv://root:root@cluster0.cxibj.mongodb.net/bdpos?retryWrites=true&w=majority"; // Primeiro Banco
    const connectionString2 = "mongodb+srv://root:root@cluster0.h3rbq.mongodb.net/dbnode?retryWrites=true&w=majority"; // Segundo Banco
    // mongoose.connect(connectionString,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}); // conexão antiga

    // conexões globais
    global.conn = mongoose.createConnection(connectionString, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
    global.conn2 = mongoose.createConnection(connectionString2, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});


//Definir porta onde o server vai responder
const port = process.env.PORT || 3000;

//Definindo as Rotas
const router = express.Router();//intercepta todas as rotas
const productRoute = require('./src/routes/product-route');
const customerRoute = require('./src/routes/customer-route');
const indexRoute = require('./src/routes/index-route');
const loginRoute = require('./src/routes/login-route');

//Vincular a aplicação (app) com o motor de rotas 
// '/api' é o caminho padrão para as APIs REST

//rota principal
app.use('/api', indexRoute);
//rota para produto
app.use('/api/produtos/', productRoute);
//rota para customer
app.use('/api/customers/', customerRoute);
//rota para login
app.use('/api/login/', loginRoute);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});

