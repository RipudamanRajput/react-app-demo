const { Router } = require("express");
const GetproductCont = require("../../Controllers/Products/GetproductCont");
const app = Router();

app.post("/getProducts", GetproductCont)

module.exports = app;