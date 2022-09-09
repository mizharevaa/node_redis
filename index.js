import  express from 'express';
import {createClient} from 'redis';

const client = createClient({ url : 'redis://default:denC3o8C4Kgcdoou68GT@containers-us-west-42.railway.app:8018'});
await client.connect();

async function Redis_work(in_str, query_str){
    
    await client.flushAll()
    console.log('Сброс таблиц')

    const resCMDsend = await client.sendCommand(in_str)
    console.log('Запуск команды: '+instr)
    console.log('Результат отправки команды: '+resCMDsend)
    const val = await client.sendCommand(query_str)
    console.log('Ответ редиски: '+val)
    return val
}

const PORT = '5000'
const app = express()

app.use(express.json())

app.get('/', async (req, res)=>{
    try {
        const pong = await client.sendCommand(['PING'])
        res.status(200).json(pong)
    } catch (error) {
        res.status(500).write('Redis client ping fails: '+ error)
    }
})

app.post('/', async (req, res)=>{
    const in_str = req.body.in_str.split(', ')
    const query_str = req.body.query_str.split(', ')

    try {
        const answer = await Redis_work(in_str, query_str)
        res.status(200).json(answer)
    } catch (error) {
        res.status(500).write('Somthing went wrong: '+ error)
    }
   
})

app.listen(PORT, () => console.log('Сервер работает!'))
