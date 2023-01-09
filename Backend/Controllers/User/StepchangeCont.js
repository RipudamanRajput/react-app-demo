const Update = require("../../Querries/Updatedata/update");

module.exports = (req, res) => {
    var query = {
        // query to find row in db
        query: {
            fname: req?.body?.fname,
            password: req?.body?.password,
        },
        // data that need to be replaced in db 
        data: {
            step: req?.body?.step
        },
        dbname: "admin",
        collection: "customers"
    }
    Update(query).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            modifiedCount: data?.modifiedCount
        })
    })
}