const conn = require('./connect')



module.exports={
    getSites: function getSites(req, res) {
        let sql = 'SELECT * FROM sk_site'
        conn.query(sql, (err, results) => {
            if (err) {
                res.send(err)
                return
            } else {
                res.send(results)
                console.log(results)
            }
        })
    }
}