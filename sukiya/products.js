const conn = require('./connect')

module.exports = {
    products:function listOutProducts(req,res){
        var response = {
            message:null,
            products:{}
        }
        //取得丼飯類資料
        let sql_bowl = `SELECT * FROM sk_products WHERE type = 'bowl'`
        conn.query(sql_bowl,(err,results)=>{
            if(err){
                console.log(err)
                response.message = err
            }
            response.products.bowl = results 
        })
        //取得咖哩類資料
        let sql_curry = `SELECT * FROM sk_products WHERE type = 'curry'`
        conn.query(sql_curry,(err,results)=>{
            if(err){
                console.log(err)
                response.message = err
            }
            response.products.curry = results
        })
        // 取得其他類資料
        let sql_other = `SELECT * FROM sk_products WHERE type = 'other'`
        conn.query(sql_other, (err, results) => {
            if (err) {
                console.log(err)
                response.message = err
            }
            response.products.other = results
            res.send(response)
        })
    }
}