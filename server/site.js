const conn = require('./connect')
const login = require('./login')

module.exports={
    getSites: function getSites(req, res) {
        login.handleCros(req,res)
        let sql = 'SELECT * FROM sk_site'
        conn.query(sql, (err, results) => {
            if (err) {
                res.send(err)
                return
            } else {
                res.send(results)
            }
        })
    }
}
