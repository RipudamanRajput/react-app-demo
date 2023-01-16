import { Navigation } from '@shopify/polaris';
import { HomeMinor, OrdersMinor, ProductsMinor } from '@shopify/polaris-icons';
import React, { useEffect, useState } from 'react';

function Sidebar() {
    const [active, setactive] = useState("Dashboard");

    const setactivetab = (data: any) => {
        setactive(data);
    }
    const item = [
        {
            url: '/panel/Dashboard',
            label: 'Dashboard',
            icon: HomeMinor,
            selected: active == "Dashboard",
            onClick: () => setactivetab('Dashboard')
        },
        {
            url: '/panel/Profile',
            label: 'Profile',
            icon: OrdersMinor,
            selected: active == "Profile",
            onClick: () => setactivetab('Profile')
        },
        {
            url: '/panel/Products',
            label: 'Products',
            icon: ProductsMinor,
            selected: active == "Products",
            onClick: () => setactivetab('Products')
        },
    ];
    useEffect(() => {
        const url = window.location.href;
        item.map((data, index) => {
            if (url.includes(data.label)) {
                setactivetab(data.label)
            }
        })
    }, [active])
    return (
        <Navigation location="/">
            <Navigation.Section
                items={item}
            />
        </Navigation>
    );
}

export default Sidebar;