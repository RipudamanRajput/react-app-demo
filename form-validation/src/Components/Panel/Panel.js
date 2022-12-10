import { Frame, TextStyle, Loading, } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, } from "react-router-dom";
import SessionExpire from "../Emptystate/Sessionexpire";
import Dashboard from "./Dashboard/Dashboard";
import AddnewProduct from "./Product/Components/AddnewProduct";
import Product from "./Product/Product";
import Viewprofile from "./Profile/Components/Viewprofile";
import Profile from "./Profile/Profile";
import Sidebar from "./Sidebar/sidebar";
import Topbar from "./TopBar/TopbarPannel";

function Panel(props) {
    const userinfo = useSelector((state) => state.login.username);
    const { DOB, fname, lname, gender, _id, profilepic } = userinfo;
    const [detail, setdetail] = useState();

    useEffect(() => {
        setdetail({ DOB, fname, lname, gender, _id, profilepic })
    }, [])

    const logo = {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: 'http://jadedpixel.com',
        accessibilityLabel: 'Jaded Pixel',
    };
    return (


        props?.data ?
            (detail ?
                (
                    <Frame
                        topBar={<Topbar
                            data={detail} />}
                        logo={logo}
                        navigation={<Sidebar />} >
                        <Routes>
                            <Route
                                path='/dashboard'
                                element={<Dashboard data={detail} />} />
                            <Route
                                path="/Profile"
                                element={<Profile data={detail} />} />
                            <Route
                                path="/Products"
                                element={<Product data={detail} />} />
                            <Route
                                path="/Profile/View"
                                element={<Viewprofile />} />
                            <Route
                                path="/Products/Add"
                                element={<AddnewProduct />} />
                            <Route path="*" element={<TextStyle>404 page not found </TextStyle>} />
                        </Routes>
                    </Frame>
                )

                :
                (
                    <Frame>
                        <Loading />
                    </Frame>
                )
            )
            :

            <SessionExpire />




    )
}

export default Panel;