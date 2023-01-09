const Delete = require("../../Querries/Delete/Delete");

module.exports = (req, res) => {
    const query = {
        data: {
            name: req.body.name,
            category: req.body.category,
            rules: req.body.rules
        },
        collection: "Profiles",
        dbname: "admin"
    }
    Delete(query).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            status: data
        })
    });
}