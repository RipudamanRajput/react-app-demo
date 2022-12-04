import { Stack } from "@shopify/polaris"
import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserContext } from "../Product"

function ProductGrid(props) {
    const profilepic = useSelector((state) => state.login.username.profilepic);
    const { status, Search, action } = useContext(UserContext)
    const [row, setrow] = useState();
    const [column, setcolumn] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    console.log(action)
    const data = [
        {
            id: "id 1",
            key: 0,
            shop_id: "2134612144546",
            img: <img alt="img" src={profilepic} width="50px" height="50px" />,
            price: 250,
            status: "In Progress"
        },
        {
            id: "id 1",
            key: 1,
            shop_id: "2134612144546",
            img: <img alt="img" src={profilepic} width="50px" height="50px" />,
            price: 250,
            status: "Not Uploaded"
        },
        {
            id: "id 1",
            key: 2,
            shop_id: "2134612144546",
            img: <img alt="img" src={profilepic} width="50px" height="50px" />,
            price: 250,
            status: "Live"
        },
        {
            id: "id 1",
            key: 3,
            shop_id: "2134612144546",
            img: <img alt="img" src={profilepic} width="50px" height="50px" />,
            price: 250,
            status: "Live"
        },
        {
            id: "id 1",
            key: 4,
            shop_id: "2134612144546",
            img: <img alt="img" src={profilepic} width="50px" height="50px" />,
            price: 250,
            status: "Live"
        },
    ];

    const col = [
        {
            title: "Id",
            dataIndex: "id",
            align: "center",
            key: "id"
        },
        {
            title: "Shop Id",
            dataIndex: "shop_id",
            align: "center",
            key: "shop id"
        },
        {
            title: "Image",
            dataIndex: "img",
            align: "center",
            key: "image"
        },
        {
            title: "Price",
            dataIndex: "price",
            align: "center",
            key: "price"
        },
        {
            title: "Status",
            dataIndex: "status",
            align: "center",
            key: "status"
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            align: "center",
            render: () =>
                <Stack distribution="center">
                    <Link>View</Link>
                    <Link>Edit</Link>
                </Stack>
        }
    ];

    useEffect(() => {
        const ab = data?.filter((item, index) => {
            if (item.status == status) {
                return item
            }
            if (status == 'All') {
                return item
            }
        })
        ab.length > 0 && setrow(ab);
    }, [status])

    useEffect(() => {
        const containsKeyword = (val) => typeof val === "string" && val.indexOf(Search) !== -1;
        let filtered = data.filter(entry => Object.keys(entry).map(key => entry[key]).some(containsKeyword));
        Search ? setrow(filtered) : setrow(data)
    }, [Search])

    useEffect(() => {
        const cols = col?.filter(item => {
            if (!action.includes(item.dataIndex)) {
                return item;
            }
        })
        cols.length > 0 && setcolumn(cols)
    }, [action])

    console.log(selectedRowKeys)

    return (
        <Table
            columns={column ? column : col}
            dataSource={row ? row : data}
            rowSelection={
                {
                    selectedRowKeys,
                    onChange: (_, data) => {
                        setSelectedRowKeys(data?.key);
                    }
                }
            } />
    )
}
export default ProductGrid;