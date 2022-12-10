import { Card, Page, Stack, TextField, Layout, DropZone, Select } from "@shopify/polaris";
import { Form, Input, Table } from "antd";
import React, { useContext, useState, useCallback } from "react";
import { render } from "react-dom";



function AddnewProduct() {
    const [data, setdata] = useState()

    console.log(data, 'data')

    const column = [
        {
            dataIndex: "varientId",
            title: "Varient Id",
            editable: true,
            render: (_, record, index) => <input
                className={index}
                placeholder="Enter Varient Id"
                onChange={(e) => {
                    setdata({
                        ...data,
                        varient: {
                            ...data?.varient,
                            [index]: {
                                //  ...data?.varient[index],
                                varient_id: e.target.value,
                            },
                        }
                    })
                }
                }
            />
        },
        {
            dataIndex: "shopId",
            title: "Shop Id",
            render: (_, record, index) => <input
                className={index}
                placeholder="Enter Varient Shop Id"
                onChange={(e) => setdata({
                    ...data,
                    varient: {
                        ...data?.varient,
                        [index]: {
                            ...data?.varient[index],
                            shop_id: e.target.value,
                        }
                    }
                })}
            />
        },
        {
            dataIndex: "price",
            title: "Price",
            render: (_, record, index) => <input
                className={index}
                placeholder="Enter Varient Shop Id"
                onChange={(e) => setdata({
                    ...data,
                    varient: {
                        ...data?.varient,
                        [index]: {
                            ...data?.varient[index],
                            price: e.target.value,
                        }
                    }
                })}
            />
        },
        {
            dataIndex: "varientstatus",
            title: "Status",
            render: (_, record, index) => <input
                className={index}
                placeholder="Enter Varient Shop Id"
                onChange={(e) => setdata({
                    ...data,
                    varient: {
                        ...data?.varient,
                        [index]: {
                            ...data?.varient[index],
                            status: e.target.value,
                        }
                    }
                })}
            />
        },
        {
            dataIndex: "varientstatusimg",
            title: "Image",

        },
        {
            dataIndex: "action",
            title: "Action",
            render: (_, record, index) => <a onClick={() => deleterow(record, index)}>Delete</a>
        }
    ]


    const rowdata = [
        {
            varientId:
                <input
                    placeholder="Enter Varient Id" />,
            shopId:
                <input
                    placeholder="Enter Varient Shop Id" />,
            price:
                <input
                    placeholder="Enter Varient Price" />,
            varientstatus:
                <input
                    placeholder="Enter Varient Status" />,
            varientstatusimg:
                <span className="varinet-image">
                    <DropZone>
                        <DropZone.FileUpload />
                    </DropZone>
                </span>,
        },
    ];

    const [row, setrow] = useState(rowdata);
    const appendrow = () => {
        rowdata.map(item => {
            return (
                setrow([...row, item])
            )
        })
    }

    const deleterow = (record, index) => {
        const arr = row.filter(item => {
            if (item !== record) {
                delete data.varient[index]
                return (item)
            }
        })
        setrow(arr)
    }

    return (
        <>
            <Page
                fullWidth
                title="Add Product">
                <Layout>
                    <Layout.Section oneThird>
                        <Card title="Product Detail">
                            <Card.Section>
                                <Stack distribution="fillEvenly">
                                    <TextField
                                        label="Id"
                                        placeholder="Enter product Id"
                                        value={data?._id}
                                        onChange={(text) => setdata({ ...data, _id: text })} />
                                    <TextField
                                        label="Shop Id"
                                        placeholder="Enter Shop Id"
                                        value={data?.shop_id}
                                        onChange={(text) => setdata({ ...data, shop_id: text })} />
                                    <TextField
                                        label="Price"
                                        placeholder="Enter Price"
                                        value={data?.price}
                                        onChange={(text) => setdata({ ...data, price: text })} />
                                    <Select
                                        label="Status"
                                        placeholder="Select Status"
                                        options={
                                            [
                                                {
                                                    label: "Not uploaded",
                                                    value: "not_uploaded"
                                                },
                                                {
                                                    label: "In Progress",
                                                    value: "in_progress"
                                                },
                                                {
                                                    label: "Live",
                                                    value: "live"
                                                },
                                            ]
                                        }
                                        value={data?.status}
                                        onChange={(text) => setdata({ ...data, status: text })}
                                    />
                                </Stack>
                            </Card.Section>
                        </Card>
                    </Layout.Section>

                    <Layout.Section oneThird>
                        <Card title="Product media">
                            <Card.Section>
                                <DropZone >
                                    <DropZone.FileUpload />
                                </DropZone>
                            </Card.Section>
                        </Card>
                    </Layout.Section>

                    <Layout.Section fullWidth>
                        <Card
                            title="Varient detail"
                            actions={[
                                {
                                    content: "Add Varient",
                                    onAction: appendrow
                                }
                            ]} >
                            <Card.Section>
                                <Table
                                    columns={column}
                                    dataSource={row.length > 0 ? row : rowdata}
                                    scroll={{ x: 1200 }}
                                    pagination={false} />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>

            </Page>
        </>
    )
}

export default AddnewProduct;