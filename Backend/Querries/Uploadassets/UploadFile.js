const path = require('path')
const multer = require('multer');
const express = require('express');
const app = express();

function UploadFile(data) {
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, data);
        },
        filename: (req, file, cb) => {
            cb(null, (file.originalname+'.png'));

        }
    });
    const filefilter = (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    const upload = multer(
        {
            storage: storage,
            fileFilter: filefilter
        });

    return upload;

}

module.exports = UploadFile;