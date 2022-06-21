import  express from 'express';
import Redis from 'ioredis';

const redis = new Redis("redis://:sogs2022@127.0.0.1:6379/0");

async function Redis_work(in_str){
    const asw = await redis.ping(in_str)
    console.log(asw)
    return asw
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
   
    const answer = Redis_work(req.query.echo)
    if(answer === req.query.echo) {
        res.status(200).json(answer)
    } else {
        res.status(500).json(answer)
    }
    
})

app.listen(PORT, () => console.log('Сервер работает!'))