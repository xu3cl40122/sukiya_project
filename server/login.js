const conn = require('./connect')
const bcrypt = require('bcryptjs')


module.exports = {

    // 註冊加登入
    login: function login(req, res) {
        addCrosHeader(req, res)
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt)
        // --- login ---
        var response = {msg:'',data:{}}
        if(req.body.isLogin){
            let sql = `SELECT * FROM sk_users WHERE email = ?`
            conn.query(sql,[req.body.email],(err,result)=>{
                if(err){
                    response.msg = err
                    res.send(response)
                    return
                }
                if (result.length != 0 && bcrypt.compareSync(req.body.password, result[0].password) ){
                    response.msg = 'login_pass'
                    response.data.name = result[0].name
                    req.session.user = result[0].name
                    response.data.user_id = result[0].user_id
                    req.session.user_id = result[0].user_id
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
        conn.query(sql, [req.body.email, hash, req.body.name, req.body.phone],
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
            
    },
    logout: function logout(req, res) {
        addCrosHeader(req, res)
        req.session.destroy(function (err) {
            console.log(err)
        })
        res.send('logout')
    },
    checkSession: function checkSession(req, res) {
        addCrosHeader(req, res)
        if (!req.session.user) {
            res.send('noSession')
            return
        }
        res.send(req.session)
    },
    handleCros: function handleCros(req, res) {
        addCrosHeader(req, res)
    }
}
function addCrosHeader(req, res) {
    // 因為 header.orgin 只能設定一個 domain 或 * ，如果想要有白名單必須在 server 端對 origin 做判斷，如果符合條件再設置相對應的 orgin
    // domain 多時可用 array 儲存增加可讀性
    if (req.headers.origin == 'null' | req.headers.origin == 'http://localhost:8080') {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    }
    res.header('Access-Control-Allow-Credentials', 'true')
}