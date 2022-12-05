const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

const  Insert  = require('./Querries/Insert/Insert');
const Find = require('./Querries/Find/Find');
const upload = require('./Querries/Uploadassets/UploadFile');
const update = require('./Querries/Updatedata/update');


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
        res.status(200).send({ data: data })
    })
})

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
app.post('/upload', upload().single('image'), (req, res, next) => {
    const { originalname, encoding } = req?.file;
    try {
        fs.readFile(`./uploads/${req?.file?.originalname}`, function (err, data) {
            if (err) throw err;
            var query = {
                query: JSON.parse(req?.body?.data),
                data: {
                    profilepic: `data:image/png;base64,${Buffer.from(data).toString('base64')}`
                }
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
        fs.readdir('uploads', (err, files) => {
            if (err) throw err;
            files.forEach((data) => {
                if (data !== originalname) {
                    fs.unlink(`uploads/${data}`, () => {
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
        }
    }
    update(query).then((data, err) => {
        if (err) throw err;
        res.status(200).send({
            modifiedCount: data?.modifiedCount
        })
    })
})

// --------- create profile with secific user 
app.post('/CreateProfiele', (req, res) => {
    const query = {
        data: {
            name: req.body.name,
            category: req.body.category,
            rules: req.body.rules,
            status: req.body.status
        },
        dbname: "admin",
        collection: "Profiles"
    }
    Insert(query)
})

// ------ banckend running at this port 

app.listen(3002, '0.0.0.0', () => {
    console.log('server Listing on port 3002');
});


