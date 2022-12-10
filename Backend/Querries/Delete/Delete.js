var MongoClienrt = require('mongodb').MongoClient;
var Url = "mongodb://localhost:27017";

function Delete(data) {
    let promise = new Promise((resolve, reject) => {
        MongoClienrt.connect(Url, (err, db) => {
            if (err) throw err;
            var dbo = db.db(data?.dbname);
            dbo.collection(data?.collection).deleteOne(data?.data, (err, res) => {
                if (err) {
                    reject(new Error(err))
                }
                resolve(res)
                db.close();
            })
        })
    })
    return promise;
}

module.exports = Delete;