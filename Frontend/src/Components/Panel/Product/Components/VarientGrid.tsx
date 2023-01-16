import { Table } from "antd";
import React, { useEffect, useState } from "react";

function VarientGrid(data: object | any) {
    const [row, setroe] = useState([]);
    useEffect(() => {
        const ar: any = [];
        data.data?.forEach((element: any | string) => {
            ar.push({
                varientimg: <img src={element.varientimg} style={{ objectFit: "cover", borderRadius: "5px" }} width={60} height={60} />,
                varient_id: element.varient_id,
                shop_id: element.shop_id,
                price: element.price,
                status: element.status
            })
        });
        setroe(ar)
    }, [])
    const column = [
        {
            dataIndex: "varientimg",
            title: "Image",
            key: "varientimg"
        },
        {
            dataIndex: "varient_id",
            title: "Varient Id",
            key: "varient_id"
        },
        {
            dataIndex: "shop_id",
            title: "Shop Id",
            key: "shop_id"
        },
        {
            dataIndex: "price",
            title: "Price",
            key: "price"
        },
        {
            dataIndex: "status",
            title: "Status",
            key: "status"
        },
    ];
    return (
        <>
            <Table columns={column} dataSource={row} pagination={false} />
        </>
    )
}

export default VarientGrid;