const conn = require('./connect')

module.exports={
    login:function login(req,res){
        // --- login ---
        if(req.body.isLogin){
            let sql = `SELECT * FROM sk_users WHERE email = ? AND password = ?`
            conn.query(sql,[req.body.email, req.body.password],(err,result)=>{
                if(err){
                    res.send(err)
                    return
                }
                if(result.length != 0){
                    res.send('pass')
                    return 
                }else{
                    res.send('nopass')
                    return
                }
            })
            
        }
        // --- sign up ---
        let sql = `INSERT INTO sk_users (email, password, name, phone) VALUES (?,?,?,?)`
        conn.query(sql, [req.body.email, req.body.password, req.body.name, req.body.phone],
            (err, results) => {
                if (err) {
                    console.log(err)
                    res.send('nopass')
                    return
                }
                res.send('pass')
            })
    }
}