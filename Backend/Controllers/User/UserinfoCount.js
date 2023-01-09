const Find = require("../../Querries/Find/Find");

module.exports = (req, res) => {
    const body = {
        data: {
            fname: req?.body?.fname,
            DOB: req?.body?.DOB,
            lname: req?.body?.lname
        },
        dbname: "admin",
        collection: "customers"
    }
    Find(body).then((data, err) => {
        if (err) throw err;
        res.status(200).send({ data: data })
    })
}