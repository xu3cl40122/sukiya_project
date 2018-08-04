const conn = require('./connect')



module.exports={
    getSites: function getSites(req, res) {
        addCrosHeader(res)
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
function addCrosHeader(res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', 'true')
}