const Update = require("../../Querries/Updatedata/update");
const ObjectId = require("mongodb").ObjectId;

module.exports = (req, res) => {

    const { name, shop_id, price, status, varient, userId, product_id, proimg } = JSON.parse(req.body?.productinfo);

    const Varientappend = () => {
        const ar = [];
        const promise = new Promise((resolve, reject) => {
            if (!varient) resolve(null);
            Object.keys(varient).forEach((data) => {
                req?.files.filter((file, index) => {
                    if (varient[data].varient_id === file.originalname) {
                        varient[data]["varientimg"] = `http://localhost:3002/images/${file.filename}`
                        ar.push(varient[data])
                        if (Object.keys(varient).length === ar.length) {
                            resolve(ar)
                        }
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
                    ar.push(file?.filename);
                    resolve(file?.filename)
                    if (ar.length === 0) {
                        rejects(new Error("No product Image"))
                    }
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

    const UpdatetoDB = (info) => {
        Update(info).then((data, err) => {
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

    const datatoUpdate = (varientdata, productimg) => {
        var info = {
            query: {
                _id: ObjectId(product_id),
            },
            data: {
                userId: userId,
                name: name,
                shop_id: shop_id,
                price: price,
                status: status,
                varient: varientdata ? varientdata : varient,
                // profilepic: productimg ? `data:image/png;base64,${Buffer.from(productimg).toString('base64')}` : null
                profilepic: productimg ? `http://localhost:3002/images/${shop_id}.png` : proimg
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
                UpdatetoDB(datatoUpdate(data, proimg));
            })
        }).catch((err) => {
            if (err) {
                Varientappend().then((data, err) => {
                    if (err) throw err;
                    UpdatetoDB(datatoUpdate(data, null));
                })
            }
        })
    } else {
        if (req?.files.length > 0) {
            Productimage().then((proimg, err) => {
                if (err) throw err;
                UpdatetoDB(datatoUpdate(varient, proimg));
            })
        } else {
            UpdatetoDB(datatoUpdate(varient, null));
        }
    }
}