import  express from 'express';
import Redis from 'ioredis';

const redis = new Redis()

async function Redis_work(in_str){
    return await redis.ping(in_str)
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    // res.status(200).json('это json, честно!')
    const answer = Redis_work(req.query.echo)
    if(answer === req.query.echo) {
        res.status(200).json(answer)
    } else {
        res.status(500).json(answer)
    }
    
})

app.listen(PORT, () => console.log('Сервер работает!'))