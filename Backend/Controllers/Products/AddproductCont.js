const Insert = require("../../Querries/Insert/Insert");
const fs = require('fs');

module.exports = (req, res) => {

    const { name, shop_id, price, status, varient, userId } = JSON.parse(req.body?.productinfo);

    const Varientappend = () => {
        const ar = [];
        const promise = new Promise((resolve, reject) => {
            if (!varient) resolve(null);
            Object.keys(varient).forEach((data) => {
                req?.files.filter((file, index) => {
                    if (varient[data].varient_id === file.originalname) {
                        fs.readFile(file?.path, function (err, res) {
                            varient[data]["varientimg"] = `data:image/png;base64,${Buffer.from(res).toString('base64')}`
                            ar.push(varient[data])
                            if (Object.keys(varient).length === ar.length) {
                                resolve(ar)
                            }
                        })
                    }
                })
            })
        })
        return (promise);
    }

    const Productimage = () => {

        const promise = new Promise((resolve, rejects) => {
            var startTime = performance.now()
            const ar = [];
            req?.files.filter((file, index) => {
                if (shop_id === file?.originalname) {
                    fs.readFile(file?.path, function (err, proimg) {
                        ar.push(proimg);
                        resolve(proimg)
                        if (ar.length === 0) {
                            rejects(new Error("No product Image"))
                        }
                    })
                }
            })
            var endTime = performance.now()
            setTimeout(() => {
                if (ar.length === 0) {
                    rejects(new Error("No product Image"))
                }
            }, Math.ceil(endTime - startTime) + 100)
        })
        return (promise);
    }

    const InserttoDB = (info) => {
        Insert(info).then((data, err) => {
            if (err) throw err;
            if (data.acknowledged) {
                res.status(200).send(data)
            }
            else {
                res.status(200).send({
                    acknowledged: data,
                    message: "Product already exists"
                })
            }
        })
    }

    const datatoInsert = (varientdata, proimg) => {
        var info = {
            query: {
                shop_id: shop_id
            },
            data: {
                userId: userId,
                name: name,
                shop_id: shop_id,
                price: price,
                status: status,
                varient: varientdata ? varientdata : varient,
                profilepic: proimg ? `data:image/png;base64,${Buffer.from(proimg).toString('base64')}` : null
            },
            dbname: "admin",
            collection: "Products"
        };
        return (info);
    }

    if (varient) {
        Productimage().then((proimg, err) => {
            if (err) throw err;
            Varientappend().then((data, err) => {
                if (err) throw err;
                InserttoDB(datatoInsert(data, proimg));
            })
        }).catch((err) => {
            if (err) {

                Varientappend().then((data, err) => {
                    if (err) throw err;
                    InserttoDB(datatoInsert(data, null));
                })
            }
        })
    } else {
        if (req?.files.length > 0) {
            Productimage().then((proimg, err) => {
                if (err) throw err;
                InserttoDB(datatoInsert(varient, proimg));
            })
        } else {
            InserttoDB(datatoInsert(varient, null));
        }
    }
}