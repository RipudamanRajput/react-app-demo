const { Router } = require('express');
const UserprofileCont = require('../../Controllers/User/UserprofileCont');
const UploadFile = require('../../Querries/Uploadassets/UploadFile');
const app = Router();

app.post('/upload', UploadFile("uploads/Account").single('image'), UserprofileCont);

module.exports = app;