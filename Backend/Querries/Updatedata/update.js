const MongoClienrt = require('mongodb').MongoClient;
const Url = "mongodb://localhost:27017/";

function Update(data) {
    let promise = new Promise((resolve, reject) => {
        MongoClienrt.connect(Url, (err, db) => {
            if (err) throw err;
            var dbo = db.db('admin');
            var myquery = data?.query;
            var newvalue = { $set: data?.data }
            dbo.collection("customers").updateOne(myquery, newvalue, (err, res) => {
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

module.exports = Update;