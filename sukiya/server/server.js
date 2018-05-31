const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const products = require('./products')
const site = require('./site')
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())// 允許跨網域

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/products',products.products)
app.get('/products/:id',products.singleProduct)
app.get('/site',site.getSites)
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});