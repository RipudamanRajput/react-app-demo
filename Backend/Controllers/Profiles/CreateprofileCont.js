const Insert = require("../../Querries/Insert/Insert");

module.exports = (req, res) => {
    const query = {
        data: {
            userId: req.body.userId,
            name: req.body.name,
            category: req.body.category,
            rules: req.body.rules,
            status: req.body.status
        },
        dbname: "admin",
        collection: "Profiles"
    }
    Insert(query).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            status: "Profile Created Sucessfully"
        })
    })
}