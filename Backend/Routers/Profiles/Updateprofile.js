const { Router } = require("express");
const UpdateproductCont = require("../../Controllers/Products/UpdateproductCont");
const app = Router();

app.post('/updateProfile', UpdateproductCont)

module.exports = app;