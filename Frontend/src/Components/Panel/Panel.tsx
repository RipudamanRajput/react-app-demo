import { Frame, TextStyle, Loading, } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, } from "react-router-dom";
import SessionExpire from "../Emptystate/Sessionexpire";
import MultiSelect from "../MultiSelect/Multiselect";
import Dashboard from "./Dashboard/Dashboard";
import AddnewProduct from "./Product/Components/AddnewProduct";
import Viewproduct from "./Product/Components/ViewProduct";
import Product from "./Product/Product";
import Viewprofile from "./Profile/Components/Viewprofile";
import Profile from "./Profile/Profile";
import Sidebar from "./Sidebar/sidebar";
import Topbar from "./TopBar/TopbarPannel";

function Panel(props: any) {
    const userinfo = useSelector((state: any) => state.login.username);
    const { DOB, fname, lname, gender, _id, profilepic } = userinfo;
    const [detail, setdetail] = useState<any>();

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
                                element={<Dashboard />} />
                            <Route
                                path="/Profile"
                                element={<Profile data={detail} />} />
                            <Route
                                path="/Profile/View"
                                element={<Viewprofile />} />
                            <Route
                                path="/Products"
                                element={<Product data={detail} />} />
                            <Route
                                path="/Products/Viewproduct"
                                element={<Viewproduct />} />
                            <Route
                                path="/Products/Add"
                                element={<AddnewProduct title="Add Product" />} />
                            <Route
                                path="/Products/Editproduct"
                                element={<AddnewProduct title="Edit Product" />} />
                            <Route
                                path="/Multiselect"
                                element={<MultiSelect />} />
                            <Route
                                path="*"
                                element={<TextStyle>404 page not found </TextStyle>} />
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