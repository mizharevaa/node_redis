import  express from 'express';
import {createClient} from 'redis';

const client = createClient();
await client.connect();


async function Redis_work(in_str, query_str){
    // const [res, val] = await redis.ping(in_str)
    // console.log(res)
    await client.flushAll()
    // const res1 = await client.sendCommand(['GEOADD', 'Circle', '13.361389', '38.115556', 'Palermo', '15.087269', '37.502669', 'Catania'])
    // const [res2, val] = await client.sendCommand(['GEORADIUS', 'Circle', '15', '37', '200', 'km', 'WITHCOORD'])

    const res1 = await client.sendCommand(in_str)
    const [res2, val] = await client.sendCommand(query_str)

    console.log(res1)
    console.log(res2)
    console.log(val)
    return val
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.post('/', async (req, res)=>{
    const in_str = req.body.in_str.split(', ')
    console.log(in_str)
    const query_str = req.body.query_str.split(', ')
    console.log(query_str)
    // const answer = await Redis_work(req.query.echo)
    // if(answer === req.query.echo) {
    //     res.status(200).json(answer)
    // } else {
    //     res.status(500).json(answer)
    // }
    
    const answer = await Redis_work(in_str, query_str)
    // if(answer === req.query.echo) {
    //     res.status(200).json(answer)
    // } else {
        res.status(500).json(answer)
    // }
})

app.listen(PORT, () => console.log('Сервер работает!'))