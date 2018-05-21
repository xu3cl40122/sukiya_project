const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const products = require('./products')
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/products',products.products)
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});