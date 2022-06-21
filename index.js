import  express from 'express';

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json('это json, честно!')
})

app.listen(PORT, () => console.log('Сервер работает!'))