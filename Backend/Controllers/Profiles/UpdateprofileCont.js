const Update = require("../../Querries/Updatedata/update");

module.exports = (req, res) => {
    Update(req.body.data).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            status: data
        })
    })
}