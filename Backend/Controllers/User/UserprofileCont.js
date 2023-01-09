const Update = require("../../Querries/Updatedata/update");
const fs = require('fs');

module.exports =(req, res, next) => {
    const { originalname, encoding, path } = req?.file;
    try {
        fs.readFile(path, function (err, data) {
            if (err) throw err;
            var query = {
                query: JSON.parse(req?.body?.data),
                data: {
                    profilepic: `data:image/png;base64,${Buffer.from(data).toString('base64')}`
                },
                dbname: "admin",
                collection: "customers"
            }
            Update(query).then((data, err) => {
                if (err) throw err;
                console.log("Profile pic changed");
            })
            res.status(200).send({
                Imginfo: {
                    name: originalname,
                    size: encoding,
                    url: `data:image/png;base64,${Buffer.from(data).toString('base64')}`
                },
            })
        });
        fs.readdir('uploads/Account', (err, files) => {
            if (err) throw err;
            files.forEach((data) => {
                if (data !== originalname) {
                    fs.unlink(`uploads/Account/${data}`, () => {
                        // console.log("previous profile image removed ")
                    })
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
}