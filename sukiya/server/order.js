const conn = require('./connect')

module.exports = {
    catchOrder: function catchOrder(req,res){
        let sql = `INSERT INTO sk_orders (user_id, product_list, phone, address, other_need) VALUES (?,?,?,?,?)`
        conn.query(sql, [req.body.user_id, req.body.products, req.body.phone, req.body.address, req.body.other_need ],
            (err,result)=>{
                if (err){
                    console.log(err)
                    res.send(err)
                    return 
                }
                res.send('pass')
        })
    }
}