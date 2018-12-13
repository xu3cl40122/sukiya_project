const conn = require('./connect')
import { addCrosHeader} from './login'

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
