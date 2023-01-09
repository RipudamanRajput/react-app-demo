const { Router } = require("express");
const StepchangeCont = require("../../Controllers/User/StepchangeCont");
const app = Router();

app.post('/stepchange', StepchangeCont)

module.exports = app;