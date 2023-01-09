const { Router } = require('express');
const Login = require("../../Controllers/Auth/LoginCont")
const app = Router();

app.post('/Login', Login)

module.exports = app;