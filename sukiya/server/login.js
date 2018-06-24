const conn = require('./connect')

module.exports={
    login:function login(req,res){
        // --- login ---
        var response = {msg:'',data:{}}
        if(req.body.isLogin){
            let sql = `SELECT * FROM sk_users WHERE email = ? AND password = ?`
            conn.query(sql,[req.body.email, req.body.password],(err,result)=>{
                if(err){
                    response.msg = err
                    res.send(response)
                    return
                }
                if(result.length != 0){
                    response.msg = 'login_pass'
                    response.data.name = result[0].name
                    response.data.user_id = result[0].user_id
                    res.send(response)
                    return 
                }else{
                    response.msg = 'login_fail'
                    res.send(response)
                    return
                }
            })
            return
            
        }
        // --- sign up ---
        let sql = `INSERT INTO sk_users (email, password, name, phone) VALUES (?,?,?,?)`
        conn.query(sql, [req.body.email, req.body.password, req.body.name, req.body.phone],
            (err, results) => {
                if (err) {
                    console.log(err)
                    if (err.code == 'ER_DUP_ENTRY'){
                        response.msg = 'be_used'
                    }else{
                        response.msg = err
                    }
                    res.send(response)
                    return
                }
                response.msg = 'signup_pass'
                response.data.name = req.body.name
                response.data.user_id = results.insertId
                res.send(response)
            })
    }
}