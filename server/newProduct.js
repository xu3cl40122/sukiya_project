const conn = require('./connect')
var formidable = require('formidable')
var fs = require('fs')

module.exports = {
    uploadImg: function uploadImg(req, res) {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            
            if (Object.keys(files) == 0){
                console.log('no image')
                res.send('no image')
                return
            }
            var oldpath = files.myFile.path
            var newpath = '../pic/products/' + files.myFile.name
            
            fs.rename(oldpath, newpath, function (err) {
                if (err){
                    res.send(err)
                    return
                };
                res.send('pass');
                
            });
        });
    }
} 