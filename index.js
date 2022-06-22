import  express from 'express';
import {createClient} from 'redis';

const client = createClient();
await client.connect();


async function Redis_work(){
    // const [res, val] = await redis.ping(in_str)
    // console.log(res)

    await client.geoAdd('Circle',[{longitude : 13.361389, latitude: 38.115556, member : 'Palermo'}, {longitude : 15.087269, latitude: 37.502669, member : 'Catania'}])
    const [res, val] = await client.sendCommand(['georadius', 'Circle',[15, 37, 200, 'km'],'WITHCOORD'])
    console.log(res)

    return val
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', async (req, res)=>{
   
    // const answer = await Redis_work(req.query.echo)
    // if(answer === req.query.echo) {
    //     res.status(200).json(answer)
    // } else {
    //     res.status(500).json(answer)
    // }
    
    const answer = await Redis_work()
    // if(answer === req.query.echo) {
    //     res.status(200).json(answer)
    // } else {
        res.status(500).json(answer)
    // }
})

app.listen(PORT, () => console.log('Сервер работает!'))