import express from 'express';
import qs from 'qs';
import {calculateBmi} from "./bmiCalculator";

const app = express();

app.set('query parser',
    (str: string) => qs.parse(str, {}))


app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Fulls Stack!');
});

app.get('/bmi', (req, res) => {

    //TODO: check if height and weight exist and are numbers... otherwise return errors
    const {weight, height} = req.query;
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
        weight, height, bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});