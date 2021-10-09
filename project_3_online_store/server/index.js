require('dotenv').config()
const express = require('express')
const sequelize = require('./bd')
const models = require('./models/models')
const cors = require('cors')
const router = require('./route/index')
const errorHandlerMiddleware = require('./middleware/ErrorHandling')

const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


app.use(errorHandlerMiddleware) // must be last in stack middleware!!

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Working!!!'})
})

const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()