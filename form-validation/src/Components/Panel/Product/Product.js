import { Page, Stack, Tabs, TextStyle, } from "@shopify/polaris";
import React, { useCallback, useState, createContext, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import ProductFilter from "./Components/ProductFilter";
import ProductGrid from "./Components/ProductGrid";

export const UserContext = createContext()

function Product() {

    const [selected, setSelected] = useState(0);
    const [status, setStatus] = useState();
    const [Search, setSearch] = useState([]);
    const [action, setaction] = useState([]);

    useEffect(() => {
        switch (selected) {
            case 0:
                setStatus("all")
                break;
            case 1:
                setStatus("not_uploaded")
                break;
            case 2:
                setStatus("in_progress")
                break;
            case 3:
                setStatus("live")
                break;
            default:
                break;
        }
    }, [selected])

    const handleTabChange = useCallback(
        (selectedTabIndex) =>
            setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all',
            content: 'All',
            panelID: 'all',
        },
        {
            id: 'not_uploaded',
            content: 'Not Uploaded',
            panelID: 'not uploaded',
        },
        {
            id: 'in_progress',
            content: 'In Progress',
            panelID: 'in progress',
        },
        {
            id: 'live',
            content: 'Live',
            panelID: 'live',
        },
    ];


    return (
        <>
            <Page
                fullWidth
                title="Product">
                <UserContext.Provider
                    value={{
                        status,
                        Search,
                        setSearch,
                        action,
                        setaction
                    }}>
                    <Stack
                        vertical>
                        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
                        <ProductFilter />
                        <ProductGrid selected={selected} />
                    </Stack>
                </UserContext.Provider>
            </Page>
           
        </>
    )
}

export default Product;