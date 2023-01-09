const { Router } = require("express");
const DeleteprofileCont = require("../../Controllers/Profiles/DeleteprofileCont");
const app = Router();

app.post('/deleteProfile', DeleteprofileCont)

module.exports = app;