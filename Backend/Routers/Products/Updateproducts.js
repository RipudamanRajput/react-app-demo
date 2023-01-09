const { Router } = require("express");
const UpdateproductCont = require("../../Controllers/Products/UpdateproductCont");
const UploadFile = require("../../Querries/Uploadassets/UploadFile");
const app = Router();

app.post("/updateProduct", UploadFile("uploads/Products").array('productimage'), UpdateproductCont)

module.exports = app;