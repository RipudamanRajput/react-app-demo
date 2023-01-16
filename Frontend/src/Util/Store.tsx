import { configureStore } from "@reduxjs/toolkit";
import loginuser from "./Slice";
export default configureStore({
    reducer:{
        login: loginuser,
    },
})