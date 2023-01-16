const express = require("express");
const cors = require('cors');

const Login = require("./Routers/Authentication/Login");
const Signup = require("./Routers/Authentication/Signup");
const StepChange = require("./Routers/UserInfo/Stepchange");
const UserInfo = require("./Routers/UserInfo/UserInfo");
const Userprofile = require("./Routers/UserInfo/Userprofile");
const Createprofile = require('./Routers/Profiles/Createprofile');
const Deleteprofile = require('./Routers/Profiles/Deleteprofile');
const Getallprofile = require('./Routers/Profiles/Getallprofile');
const Updateprofile = require('./Routers/Profiles/Updateprofile');
const Addproduct = require('./Routers/Products/Addproduct');
const Getproducts = require('./Routers/Products/Getproducts');
const Updateproducts = require('./Routers/Products/Updateproducts');

const app = express();

app.use(express.static('./uploads/Products')); 
app.use('/images', express.static('./uploads/Products'));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Login);
app.use(Signup);
app.use(StepChange);
app.use(UserInfo);
app.use(Userprofile);
app.use(Createprofile);
app.use(Deleteprofile);
app.use(Getallprofile);
app.use(Updateprofile);
app.use(Addproduct);
app.use(Getproducts);
app.use(Updateproducts);

app.listen(3002, '0.0.0.0', () => {
    console.log('server Listing on port 3002');
});