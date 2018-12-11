const conn = require('./connect')
var formidable = require('formidable')
var fs = require('fs')

module.exports = {
    addProduct: function addProduct(req, res) {
        var form = new formidable.IncomingForm()
        var msg = {err:false,hasImg:false}
        form.parse(req, function (err, fields, files) {
            if (Object.keys(files).length != 0){//判斷是否有上傳照片
                //將檔案移到該上傳的位置
                msg.hasImg = true
                var oldpath = files.myFile.path
                var newpath = '../pic/products/' + files.myFile.name
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {msg.err = true};
                });
            }
            //將新產品寫入資料庫
            //如果沒有上傳照片 newpath 會是null 暫時把資料庫的 img_path 設為可以接受 null 解決這個 bug
            let product = JSON.parse(fields.productData)
            let sql = `INSERT INTO sk_products (name, type, price_s, price_m, price_l, price_xl, intro, img_path) VALUES (?,?,?,?,?,?,?,?)`
            conn.query(sql, [product.name, product.type, product.s, product.m, product.l, product.xl, product.describe, newpath ],
                (err,result)=>{
                    if(err){
                        msg.err = true
                    }
                    res.send(msg)
                })
        });
    }
} 