const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    modulo: String,
    dados: Array
});

//module.exports = mongoose.model('Produto', produtoSchema); // Antigo
module.exports = conn2.model('Log', logSchema); // novo

