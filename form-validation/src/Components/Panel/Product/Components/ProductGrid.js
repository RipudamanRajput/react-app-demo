import { Stack, Badge, Button, TextStyle } from "@shopify/polaris"
import { Table } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Product"
import VarientGrid from "./VarientGrid";

function ProductGrid(props) {
    const history = useNavigate();
    const { _id } = useSelector((state) => state.login.username);
    const [loading, setloading] = useState(true);
    const { status, Search, action } = useContext(UserContext)
    const [row, setrow] = useState();
    const [column, setcolumn] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setrowdata] = useState([])


    useEffect(() => {
        axios.post("http://localhost:3002/getProducts", { id: _id }).then((res, err) => {
            const ar = [];
            res?.data.forEach(element => {
                ar.push({
                    key: element._id,
                    _id: element._id,
                    title: element.name,
                    shop_id: element.shop_id,
                    proimg: element.profilepic,
                    img: <img src={element.profilepic} style={{ objectFit: "cover", borderRadius: "5px" }} width={60} height={60} />,
                    price: element.price,
                    varient: element.varient,
                    status: element.status
                })
            });
            setrowdata(ar);
            setloading(false);
        })
    }, [])

    const navigate = (data, location) => {
        history(location, {
            state: {
                id: data?._id,
                shop_id: data.shop_id,
                title: data.title,
                img: data.proimg,
                price: data.price,
                varient: data.varient,
                status: data.status
            }
        })
    }

    const col = [
        {
            title: "Id",
            dataIndex: "_id",
            align: "center",
            key: "id",
            width: 200
        },
        {
            title: "Title",
            dataIndex: "title",
            align: "center",
            key: "title"
        },
        {
            title: "Image",
            dataIndex: "img",
            align: "center",
            key: "image"
        },
        {
            title: "Shop Id",
            dataIndex: "shop_id",
            align: "center",
            key: "shop id"
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
            render: (_, record) =>
                <Stack distribution="center">
                    <Button plain onClick={() => navigate(record, "Viewproduct")}>View</Button>
                    <TextStyle>|</TextStyle>
                    <Button plain onClick={() => navigate(record, "Editproduct")}>Edit</Button>
                </Stack>
        }
    ];

    useEffect(() => {
        const ab = data?.filter((item, index) => {
            if (item.status == status) {
                return item
            }
            if (status == 'all') {
                return item
            }
        })
        ab.length > 0 ? setrow(ab) : setrow([]);
    }, [status])

    useEffect(() => {
        const containsKeyword = (val) => typeof val === "string" && val.indexOf(Search) !== -1;
        let filtered = data.filter(entry => Object.keys(entry).map(key => entry[key]).some(containsKeyword));
        (Search && filtered.length !==0) ? setrow(filtered) : setrow([])
    }, [Search])

    useEffect(() => {
        const cols = col?.filter(item => {
            if (!action.includes(item.dataIndex)) {
                return item;
            }
        })
        cols.length > 0 && setcolumn(cols)
    }, [action])

    return (
        <Table
            columns={column ? column : col}
            loading={loading}
            dataSource={
                row?.length > 0
                    ? row
                    : (status === "all") && data}
            rowSelection={{
                ...selectedRowKeys,
                onChange: (_, data) => {
                    setSelectedRowKeys(data);
                }
            }}
            expandable={{
                expandedRowRender: (record) => { return <VarientGrid data={record.varient} /> },
                rowExpandable: (record) => record.varient,
            }} />
    )
}
export default ProductGrid;