const MongoClienrt = require('mongodb').MongoClient;
const Url = "mongodb://localhost:27017/";

const Find = require('../Find/Find');

function Insert(data) {
    let promise = new Promise((resolve, reject) => {
        MongoClienrt.connect(Url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(data?.dbname);
            Find(data).then((res, err) => {

                if (res?._id) {
                    resolve(false)

                } else {
                    resolve(true)
                    dbo.collection(`${data?.collection}`).insertOne(data?.data, (err, res) => {
                        if (err) throw err;
                        db.close();
                    })
                }
            });
        })


    });
    return promise;
}


module.exports =  Insert ;
