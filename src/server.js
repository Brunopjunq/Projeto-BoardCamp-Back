import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get('/status', (req,res) => {
    res.send('ok');
})

app.listen(4000, () => {
    console.log('Listening on 4000');
});