const express = require('express');
const app = express();
const port = 8081;

// parse application/json
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let servicesList = [
    {header: "Телевидение", description: "Доп каналы"},
    {header: "Скоростное соединение", description: "Доп скорость"},
    {header: "Еще что то", description: "что то"},
];

let tariffList = [
    {header: "Тариф-выгодный", description: "500Мбит/с"},
    {header: "Не очень выгодный", description: "100Мбит/с"},
    {header: "Не очень выгодный", description: "100Мбит/с"},
];

const handleServicesChange = (req, res) => {
    servicesList = req.body;
}
const handleTariffChange = (req, res) => {
    tariffList = req.body;
}

app.get('/services', (req, res) => {
    res.send(servicesList);
});

app.get('/tariff', (req, res) => {
    res.send(tariffList);
});

app.post('/add/services', handleServicesChange);
app.delete('/delete/services', handleServicesChange);

app.post('/add/tariff', handleTariffChange);
app.put('/change/tariff', handleTariffChange);
app.delete('/delete/tariff', handleTariffChange);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});