const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const products = require('./products')
const login = require('./login')
const site = require('./site')
const order = require('./order')
const newProduct = require('./newProduct')
var cors = require('cors')// 跨網域

var corsOptions = {
    origin: true,//true =>允許所有 origin 
    credentials:true
}

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 24 * 60 * 60 * 1000 } }))
app.use(express.static('public'))
app.use(bodyParser.json());

app.options('*', cors(corsOptions)) // handle preflight request
app.use(cors())// 允許跨網域
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/products',products.products)
app.get('/products/:id',products.singleProduct)
app.get('/site',site.getSites)
app.post('/login',cors(corsOptions),login.login)
app.post('/catchOrder', order.catchOrder)// 接收訂單
app.get('/checkSession',login.checkSession)// 檢查 session
app.get('/logout', cors(corsOptions),login.logout)
app.post('/upload', newProduct.uploadImg)
   

// --- 後台 ---
app.post('/allOrders', order.getAllOrders) //後臺顯示所有訂單
app.post('/filterOrders',order.getFiteredOrders) // 後台訂單條件篩選
app.post('/backProducts',products.backProducts)// 後台商品列表
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
