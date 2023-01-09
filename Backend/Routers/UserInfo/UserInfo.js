const { Router } = require('express');
const UserinfoCount = require('../../Controllers/User/UserinfoCount');
const app = Router();

app.post('/detail', UserinfoCount)

module.exports = app;