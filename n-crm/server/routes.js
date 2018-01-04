let Product = require('../model/Product');
var multer = require('multer');
var sess ;
module.exports = function(app) {
    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./Images");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });
    var upload = multer({
        storage: Storage
    }).array("imgUploader", 3); //Field name and max count

    // app.get("/", function(req, res) {
    //     sess = req.session;
    //     sess.name = "Thi";
    //     sess.nickname = "Thi";
    //     res.render('test',{title:'login page', session: sess});
    // });
    app.post("/product/api/Upload", function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.end("Something went wrong!");
            }
            return res.end("File uploaded sucessfully!.");
        });
    });
}