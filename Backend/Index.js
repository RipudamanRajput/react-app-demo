const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

const Insert = require('./Querries/Insert/Insert');
const Find = require('./Querries/Find/Find');
const upload = require('./Querries/Uploadassets/UploadFile');
const update = require('./Querries/Updatedata/update');
const Delete = require('./Querries/Delete/Delete');


const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let detail = [];

app.get('/home', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    // console.log('Book : ', JSON.stringify(detail));
    res.end(JSON.stringify(detail));
});

// --------------------------------------------------------------------------- Authenticatio APIS

// ------- API for signup user
app.post('/create', (req, res) => {
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
    detail.push(newDetail);
});

// ------- API for Login User
app.post('/Login', (req, res) => {
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
})


// -------------------------------------------------------------------------- User Info APIS

// ------- User Info API
app.post('/detail', (req, res) => {
    const body = {
        data: {
            fname: req?.body?.fname,
            DOB: req?.body?.DOB,
            lname: req?.body?.lname
        },
        dbname: "admin",
        collection: "customers"
    }
    Find(body).then((data, err) => {
        if (err) throw err;
        res.status(200).send({ data: data })
    })
})

// ------------API to upload file 
app.post('/upload', upload("uploads/Account").single('image'), (req, res, next) => {
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
            update(query).then((data, err) => {
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
});

// ------------------ update step to db 
app.post('/stepchange', (req, res) => {
    var query = {
        // query to find row in db
        query: {
            fname: req?.body?.fname,
            password: req?.body?.password,
        },
        // data that need to be replaced in db 
        data: {
            step: req?.body?.step
        },
        dbname: "admin",
        collection: "customers"
    }
    update(query).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            modifiedCount: data?.modifiedCount
        })
    })
})

// ---------------------------------------------------------------------------- Profiles APIS

// --------- create profile with secific user 
app.post('/CreateProfiele', (req, res) => {
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
})

// ------- API for all profile list
app.post('/allProfiles', (req, res) => {
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
})

// ----- delete specific profile
app.post('/deleteProfile', (req, res) => {
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
})

// ------ update specific profile
app.post('/updateProfile', (req, res) => {
    update(req.body.data).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            status: data
        })
    })
})

// -------------------------------------------------------------------------- Product APIS

// ------ Add products 
app.post('/addProduct', upload("uploads/Products").array('productimage'), (req, res) => {

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
            }, Math.ceil(endTime - startTime) + 1)

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
})

// ------- Fetch Products APIs
app.post("/getProducts", (req, res) => {
    const body = {
        data: {
            userId: req.body.id
        },
        dbname: "admin",
        collection: "Products"
    }
    Find(body).then((data, err) => {
        res.status(200).send(data)
    })
})

app.post("/updateProduct", (req, res) => {
    res.status(200).send(req.body);
    console.log(req.body)
})
// -----------------------------------------------------------------------------  banckend running at this port 

app.listen(3002, '0.0.0.0', () => {
    console.log('server Listing on port 3002');
});


