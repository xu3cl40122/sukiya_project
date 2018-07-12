const conn = require('./connect')

module.exports = {
    catchOrder: function catchOrder(req,res){
        let time = new Date().toLocaleString();
        let sql = `INSERT INTO sk_orders (user_id, product_list, phone, address, other_need, total) VALUES (?,?,?,?,?,?)`
        conn.query(sql, [req.body.user_id, req.body.products, req.body.phone, req.body.address, req.body.other_need, req.body.total ],
            (err,result)=>{
                if (err){
                    console.log(err)
                    res.send(err)
                    return 
                }
                res.send('pass')
        })
    },
    getAllOrders:function getAllOrders(req,res){
        let orderBy = 'order_id'
        let sql = `SELECT * FROM sk_orders JOIN sk_users ON sk_orders.user_id = sk_users.user_id ORDER BY ${orderBy}`
        conn.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                    return
                }
                console.log(result)
                res.send(result)
            }
        )
    }
}