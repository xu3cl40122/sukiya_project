const conn = require('./connect')
function sqlSelectPoducts(type){
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
var response = {
    message: null,
    products: {}
}

function main() {
    return Promise.all([sqlSelectPoducts('curry'),sqlSelectPoducts('bowl'),sqlSelectPoducts('other')]);
}
module.exports = {
    products:function listOutProducts(req,res){
        main().then((value)=>{
            //console.log(value)
            res.send(response)
        }).catch((err)=>{
            console.log(err)
            response.message = err 
            res.send(response)            
        })
    }
}