const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        mongoose.set('strictQuery', true)
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo connecting: ${connection.connection.host}`)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectMongo