const Insert = require("../../Querries/Insert/Insert");

module.exports = (req, res) => {
    // to send message in response
    const query = {
        data: {
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password,
            DOB: req.body.DOB,
            gender: req.body.gender,
            agree: req.body.agree,
            step: req.body.step,
            profilepic: ""
        },
        dbname: "admin",
        collection: "customers"
    };
    Insert(query).then((data, err) => {
        res.status(200).send({ data: data })
    })
    // detail.push(newDetail);
}