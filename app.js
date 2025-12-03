require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');




const app = express();


app.use(express.json())


const PORT = process.env.PORT || 7777

const ServerConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongodb')
        app.listen(PORT, () => {
            console.log(`server is listening to ${PORT}`)
        })
    } catch (err) {
        console.error('Mongodb Connection Error', err.message);
        process.exit(1)
    }
}
ServerConnection()