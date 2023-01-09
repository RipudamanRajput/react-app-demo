const Find = require("../../Querries/Find/Find")

module.exports = (req, res) => {
    const body = {
        data: {
            userId: req.body?.id
        },
        dbname: "admin",
        collection: "Products"
    }
    Find(body).then((data, err) => {
        res.status(200).send(data)
    })
}