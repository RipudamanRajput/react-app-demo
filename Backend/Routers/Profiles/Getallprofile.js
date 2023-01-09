const { Router } = require("express");
const GetallprofileCont = require("../../Controllers/Profiles/GetallprofileCont");
const app = Router();

app.post('/allProfiles', GetallprofileCont)

module.exports = app;