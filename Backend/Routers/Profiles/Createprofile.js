const { Router } = require("express");
const CreateprofileCont = require("../../Controllers/Profiles/CreateprofileCont");
const app = Router();

app.post('/CreateProfiele', CreateprofileCont)

module.exports = app;