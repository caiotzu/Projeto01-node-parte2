const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const customerSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

// Registration
    customerSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null))
    }

// Login
    customerSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    }

// module.exports = mongoose.model('Customer', customerSchema);
module.exports = conn.model('Customer', customerSchema);

