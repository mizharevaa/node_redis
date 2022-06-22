import  express from 'express';
import { createClient } from 'ioredis';

const redis = new createClient();
await redis.connect();

async function Redis_work(in_str){
    const [res, val] = await redis.ping(in_str)
    console.log(res)
    return res
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', async (req, res)=>{
   
    const answer = await Redis_work(req.query.echo)
    if(answer === req.query.echo) {
        res.status(200).json(answer)
    } else {
        res.status(500).json(answer)
    }
    
})

app.listen(PORT, () => console.log('Сервер работает!'))