const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const products = require('./products')
const login = require('./login')
const site = require('./site')
const order = require('./order')
var cors = require('cors')// 跨網域


app.use(session({
    secret: 'fdsh521',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
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
app.post('/checkSession',login.checkSession)// 檢查 session
app.post('/test',login.test)// 寫 session 進去
// --- 後台 ---
app.post('/allOrders', order.getAllOrders) //後臺顯示所有訂單
app.post('/filterOrders',order.getFiteredOrders) // 後台訂單條件篩選
app.post('/backProducts',products.backProducts)// 後台商品列表
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
