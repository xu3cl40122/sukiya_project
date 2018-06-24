const conn = require('./connect')

module.exports = {
    catchOrder: function catchOrder(req,res){
        console.log(req.body)
        res.send(req.body)
    }
}