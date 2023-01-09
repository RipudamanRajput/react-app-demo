const { Router } = require("express");
const AddproductCont = require("../../Controllers/Products/AddproductCont");
const UploadFile = require("../../Querries/Uploadassets/UploadFile");
const app = Router();

app.post('/addProduct', UploadFile("uploads/Products").array('productimage'), AddproductCont)

module.exports = app;