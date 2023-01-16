import { Page, Stack, Tabs, TextStyle, } from "@shopify/polaris";
import React, { useCallback, useState, createContext, useEffect } from "react";
import ProductFilter from "./Components/ProductFilter";
import ProductGrid from "./Components/ProductGrid";

export const UserContext = createContext<any>(null)

function Product(props:any) {

    const [selected, setSelected] = useState<any | number>(0);
    const [status, setStatus] = useState<string>();
    const [Search, setSearch] = useState<any>([]);
    const [action, setaction] = useState<any>([]);

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
        (selectedTabIndex: any | string) =>
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
                        <ProductGrid />
                    </Stack>
                </UserContext.Provider>
            </Page>

        </>
    )
}

export default Product;