const conn = require('./connect')

module.exports = {
    catchOrder: function catchOrder(req,res){
        let sql = `INSERT INTO sk_orders (user_id, product_list, phone, address, other_need, total) VALUES (?,?,?,?,?,?)`
        conn.query(sql, [req.body.user_id, req.body.products, req.body.phone, req.body.address, req.body.other_need, req.body.total ],
            (err,result)=>{
                if (err){
                    console.log(err)
                    res.send(err)
                    return 
                }
                res.send(result)
        })
    },
    getAllOrders:function getAllOrders(req,res){
        let orderBy = 'order_id'
        let sql = `SELECT * FROM sk_orders JOIN sk_users ON sk_orders.user_id = sk_users.user_id ORDER BY sk_orders.created_at ASC`
        conn.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                    return
                }
                res.send(result)
            }
        )
    },
    getFilterOrders(req,res){
        // 搜尋日期外面要包 ' ' 才有效果
        let condition = `WHERE created_at > '${req.body.from}' AND created_at < '${req.body.to}' `
        let sql = `SELECT * FROM sk_orders JOIN sk_users ON sk_orders.user_id = sk_users.user_id ${condition}`
        conn.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
                return
            }
            res.send(result)
        }
        )
    },
    changeOrderStatus(req,res){
        let sql = `UPDATE sk_orders SET status = ? WHERE order_id = ?`
        conn.query(sql,[req.body.status, req.body.id], (err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
                return
            }
            res.send('done')
        })
    },
    deleteOrder(req,res){
        let sql =`DELETE FROM sk_orders WHERE order_id = ?`
        conn.query(sql, req.query.id ,(err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
                return
            }
            res.send('done')
        })
    }
    
    
    
}