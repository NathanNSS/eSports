import express from 'express';
import cors from "cors"

//Routers
import Main from './routers/index'

const app = express()

app.use(cors())
app.use(express.json())

let port = 3333;

app.use(Main)

app.listen(port, () => {
    let cData = new Date()
    let data = `${cData.getDate()}/${cData.getMonth() + 1}/${cData.getFullYear()} ${cData.getHours()}:${cData.getMinutes()}:${cData.getSeconds()}`;
    console.log(`${data} Servidor rodando na porta ${port} :)`)
})