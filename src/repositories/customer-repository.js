const Customer = require('../app/models/customer')

// Post
exports.post = async(data) => {
    const customer = new Customer(data)
    await customer.save()
}

//GetAll
exports.getAll = async() => {
    const res = await Customer.find()
    return res
}

// GetById
exports.getById = async(id) => {
    const res = await Customer.findById(id)
    return res
}

// Put
exports.put = async(id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
}

// Delete
exports.delete = async(id) => {
    await Customer.findByIdAndDelete(id)
}

exports.register = async (name, mail, pass) => {
    const result = await Customer.find({
        email: mail
    })
    
    if(result.length > 0) {
        throw {
            status: 400,
            message: `Usuário já existente`
        }
    }

    const customer = new Customer()

    customer.name = name
    customer.email = mail
    customer.password = customer.generateHash(pass)

    customer.save( (err, res) => {
        if(err) {
            return res.send({
                success: false, 
                message: `Error on save`
            })
        }
    })

    return {
        custom: customer
    }
}