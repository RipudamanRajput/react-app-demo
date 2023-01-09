const Find = require("../../Querries/Find/Find")

module.exports = (req, res) => {
    const body = {
        data: {
            fname: req.body.fname,
            password: req.body.password
        },
        dbname: "admin",
        collection: "customers"
    }
    Find(body).then((data, err) => {
        res.status(200).send(data)
    })
}