import express from 'express'
import {data} from './data.js';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use('/', express.static('public'));
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/budget', (req, res) => {
    console.log("Budget requested");
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});