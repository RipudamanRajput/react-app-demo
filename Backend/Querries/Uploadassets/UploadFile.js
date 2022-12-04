const path = require('path')
const multer = require('multer');
const express = require('express');
const app = express();

function UploadFile(data) {
    // let promise = new Promise((resolve, reject) => {


        app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

        const storage = multer.diskStorage({
            destination: (req, res, cb) => {
                cb(null, 'uploads');
            },
            filename: (req, file, cb) => {
                cb(null, (file.originalname));

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

        // Upload route

        // app.post('/upload', upload.single('image'), (req, res, next) => {
        //     try {
        //         return res.status(201).json({
        //             message: 'File Uploaded successfully'
        //         });
        //     } catch (error) {
        //         console.error(error)
        //     }
        // });

    // })
return upload;

}

module.exports = UploadFile;