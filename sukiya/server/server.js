const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const products = require('./products')
const login = require('./login')
const site = require('./site')
const order = require('./order')
var cors = require('cors')// 跨網域
// 可以存取靜態檔案 localhost:3000/ + 檔案名
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors())// 允許跨網域
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/products',products.products)
app.get('/products/:id',products.singleProduct)
app.get('/site',site.getSites)
app.post('/login',login.login)
app.post('/catchOrder', order.catchOrder)// 接收訂單
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
