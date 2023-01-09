
const { Router } = require('express');
const SignupCont = require('../../Controllers/Auth/SignupCont');
const app = Router();
  
app.post('/create', SignupCont);
  
module.exports = app;