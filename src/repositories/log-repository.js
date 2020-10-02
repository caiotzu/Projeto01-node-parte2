const Log = require('../app/models/log')

// Post
exports.log = async(data) => {
    const log = new Log(data)
    await log.save()
}
