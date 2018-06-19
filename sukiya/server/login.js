const conn = require('./connect')

module.exports={
    login:function login(req,res){
        console.log(req.body)
        res.send(req.body)
    }
}