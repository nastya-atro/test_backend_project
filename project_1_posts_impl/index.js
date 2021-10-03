import express from 'express'
import mongoose from 'mongoose'
import router from "./src/router.js";
import fileUpload from 'express-fileupload';

const PORT = 5000;
const BD_URL = `mongodb+srv://user:user@cluster0.zpt87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const app = express();

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try{
        await mongoose.connect(BD_URL)
        app.listen(PORT, ()=> console.log('Server started'))
    }catch (e){
        console.log(e)
    }
}

startApp()