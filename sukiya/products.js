const conn = require('./connect')

function sqlSelectPoducts(type){
    //創造一個 promise object  成功則執行 resolve 反之 reject
    // resolve , reject 可傳一個參數，在後面由 .then() .catch() 接收並做後續處理
    return new Promise(function (resolve, reject){
        let sql = `SELECT * FROM sk_products WHERE type = '${type}'`
        conn.query(sql, (err, results) =>{
            if(err){
                reject(err)
            }else{
                response['products'][type] = results
                resolve(results)
            }
        })
    })
}



function main() {
    // promise.all 全部 promise 都有結果了才會往下跑
    return Promise.all([sqlSelectPoducts('curry'),sqlSelectPoducts('bowl'),sqlSelectPoducts('other')]);
}
module.exports = {
    products:function listOutProducts(req,res){
        var response = {
            message: null,
            products: {}
        }
        main().then((value)=>{
            //console.log(value)
            res.send(response)
        }).catch((err)=>{
            console.log(err)
            response.message = err 
            res.send(response)            
        })
    },
    singleProduct: function singleProduct(req,res){
        let id = req.params.id // get url參數 
        let sql = `SELECT * FROM sk_products WHERE product_id = ?`
        conn.query(sql,[id],(err,result)=>{
            if(err){
                res.send(err)
                return
            }
            res.send(result)
        })
    }
}