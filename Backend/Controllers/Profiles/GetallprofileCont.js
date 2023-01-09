const Find = require("../../Querries/Find/Find");

module.exports = (req, res) => {
    const body = {
        data: {
            userId: req.body.userId
        },
        dbname: "admin",
        collection: "Profiles",
    }
    Find(body).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            status: data
        })
    })
}