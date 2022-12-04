import { Frame, TextStyle, Loading } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Product from "./Product/Product";
import Viewprofile from "./Profile/Components/Viewprofile";
import Profile from "./Profile/Profile";
import Sidebar from "./Sidebar/sidebar";
import Topbar from "./TopBar/TopbarPannel";

function Panel(props) {
    const [detail, setdetail] = useState();
    const [profile, setprofile] = useState();
    const { fname, lname, DOB } = props.data;

    const data = {
        fname: fname,
        lname: lname,
        DOB: DOB
    }

    useEffect(() => {
        axios.post('http://localhost:3002/detail', data)
            .then((res, err) => {
                if (err) throw err;
                setdetail(res.data)
            })

    }, [profile])



    const logo = {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: 'http://jadedpixel.com',
        accessibilityLabel: 'Jaded Pixel',
    };
    return (


        detail ?
            <>
                <div style={{ height: '80px' }}>
                    <Frame
                        topBar={<Topbar
                            setprofile={setprofile}
                            data={detail?.data} />}
                        logo={logo}
                        navigation={<Sidebar />} >
                        <Routes>
                            <Route
                                path='/dashboard'
                                element={<Dashboard data={detail?.data} setprofile={setprofile} />} />
                            <Route
                                path="/Profile"
                                element={<Profile data={detail?.data} />} />
                            <Route
                                path="/Products"
                                element={<Product data={detail?.data} />} />
                            <Route
                                path="/Profile/View"
                                element={<Viewprofile />} />
                            <Route path="*" element={<TextStyle>404 page not found </TextStyle>} />
                        </Routes>
                    </Frame>
                </div>


            </>
            :

            <Frame>
                <Loading />
            </Frame>




    )
}

export default Panel;