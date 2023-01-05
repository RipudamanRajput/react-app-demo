import { Card, Page, Stack, TextField, Layout, DropZone, Select, Button, } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

function AddnewProduct(title) {
    const Productinfo = useLocation()?.state;
    const userId = useSelector((state) => state.login.username._id)
    const [data, setdata] = useState()
    console.log(data, 'data')

    // Edit Product Varinet append 
    useEffect(() => {
        const detail = {
            name: Productinfo?.title,
            shop_id: Productinfo?.shop_id,
            price: Productinfo?.price,
            status: Productinfo?.status,
        }
        const ar = [];
        Productinfo?.varient && Productinfo?.varient.forEach((element, index) => {
            ar.push({
                varient_id: element?.varient_id,
                shop_id: element?.shop_id,
                price: element?.price,
                status: element?.status,
                // varientimg: element?.varientimg
            })
        });
        if (ar.length > 0) {
            setrow(ar);
            setdata({
                ...detail,
                varient: { ...ar }
            })
        } else {
            setdata({
                ...data,
                ...detail,
                // thumb: Productinfo?.img,
            })
        }
    }, [])

    const column = [
        {
            dataIndex: "varient_id",
            title: "Varient Id",
            editable: true,
            render: (_, record, index) =>
                < input
                    value={Productinfo?.varient && (data?.varient[index]?.varient_id ?? record?.varient_id)}
                    className={index}
                    placeholder="Enter Varient Id"
                    onChange={(e) => {
                        setdata({
                            ...data,
                            varient: {
                                ...data?.varient,
                                [index]: {
                                    // ...data?.varient[index],
                                    varient_id: e.target.value,
                                },
                            }
                        })
                    }
                    }
                />

        },
        {
            dataIndex: "shop_id",
            title: "Shop Id",
            render: (_, record, index) => <input
                value={Productinfo?.varient && (data?.varient[index]?.shop_id ?? record?.shop_id)}
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
                value={Productinfo?.varient && (data?.varient[index]?.price ?? record?.price)}
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
            dataIndex: "status",
            title: "Status",
            render: (_, record, index) => <input
                value={Productinfo?.varient && (data?.varient[index]?.status ?? record?.status)}
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
            dataIndex: "varientimg",
            title: "Image",
            render: (_, record, index) =>
                <Stack>
                    {data?.varient?.[index]?.varientimg ?
                        <img width={"80px"} src={URL.createObjectURL(data?.varient?.[index]?.varientimg)} alt='product image' />
                        :
                        <span className="varinet-image">
                            <DropZone
                                allowMultiple={false}
                                children={<img width={"80px"} alt='product image' />}
                                onDrop={(
                                    _dropFiles,
                                    acceptedFiles,
                                ) => {
                                    if (_dropFiles) {
                                        setdata({
                                            ...data,
                                            varient: {
                                                ...data?.varient,
                                                [index]: {
                                                    ...data?.varient?.[index],
                                                    varientimg: acceptedFiles[0],
                                                }
                                            }
                                        })
                                    }
                                }}>
                                <DropZone.FileUpload />
                            </DropZone>
                        </span>
                    }
                </Stack>

        },
        {
            dataIndex: "action",
            title: "Action",
            render: (_, record, index) => index !== 0 && <a onClick={() => deleterow(record, index)}>Delete</a>
        }
    ]

    const rowdata = [
        {
            varient_id:
                <input
                    placeholder="Enter Varient Id" />,
            shop_id:
                <input
                    placeholder="Enter Varient Shop Id" />,
            price:
                <input
                    placeholder="Enter Varient Price" />,
            status:
                <input
                    placeholder="Enter Varient Status" />,
            varientimg:
                <>
                    <span className="varinet-image">
                        <DropZone>
                            <DropZone.FileUpload />
                        </DropZone>
                    </span>
                </>,
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
                delete data?.varient[index]
                return (item)
            }
        })
        setrow(arr)
    }

    const Error = (data) => swal({
        title: data ? data : "Kindly Fill All recommended Fields",
        icon: "error",
        buttons: {
            catch: {
                text: "Cancel",
                value: "catch",
            }
        }
    })

    const addproduct = (Apiname) => {
        var formdata = new FormData();
        if (data) {
            const { name, shop_id, price, status, thumb, varient } = data;
            var details = JSON.stringify({
                name: name,
                shop_id: shop_id,
                price: price,
                status: status,
                varient: varient,
                userId: userId,
            });
            let arr = [];
            if (varient) {
                Object.keys(varient).filter(elements => {
                    if (!varient[elements]?.varientimg) {
                        Error("Kindly Select Varient Image")
                    }
                    arr.push(
                        {
                            file: varient[elements]?.varientimg,
                            name: varient[elements]?.varient_id
                        }
                    )
                })
                const files = (varient && thumb) ?
                    [...arr, { file: thumb, name: shop_id }]
                    : (varient && !thumb) ?
                        arr
                        : [{ file: thumb, name: shop_id }]

                files.map((data, index) => {
                    formdata.append(`productimage`, data?.file, data?.name);
                })
                formdata.append('productinfo', details);
            } else if (thumb && !varient) {
                [{ file: thumb, name: shop_id }].map((data, index) => {
                    formdata.append(`productimage`, data?.file, data?.name);
                })
                formdata.append('productinfo', details);
            } else {
                formdata.append('productinfo', details);
            }
            if (name, shop_id, price, status) {
                if (Apiname === "update") {
                    console.log(details,"dskjdask")
                    axios.post('http://localhost:3002/updateProduct', data).then((res,err)=>{
                        // console.log(res.data,"dsakjdsj")
                    })
                }
                if (Apiname === "insert") {
                    axios.post('http://localhost:3002/addProduct', formdata).then((res, err) => {
                        if (err) throw err;
                        if (res.data.acknowledged) {
                            swal({
                                title: "Product Scuccessfully Added ",
                                icon: "success",
                                buttons: {
                                    catch: {
                                        text: "Cancel",
                                        value: "catch",
                                    }
                                }
                            })
                            window.history.go(-1);
                        } else {
                            Error(res.data.message)
                        }
                    })
                }
            } else {
                Error()
            }
        } else {
            Error()
        }
    }

    return (
        <Page
            fullWidth
            primaryAction={
                title.title.includes("Edit") ?
                    {
                        content: "Update",
                        onAction: () => addproduct("update")
                    }
                    :
                    {
                        content: "Save",
                        onAction: () => addproduct("insert")
                    }
            }
            secondaryActions={<Button onClick={() => window.history.go(-1)}>
                Back
            </Button>}
            title={title ? title.title : "Add Product"}>

            <Layout>
                <Layout.Section oneThird>
                    <Card title="Product Detail">
                        <Card.Section>
                            <Stack distribution="fillEvenly">
                                <TextField
                                    requiredIndicator
                                    label="Name"
                                    placeholder="Enter product Id"
                                    value={data?.name}
                                    onChange={(text) => setdata({ ...data, name: text })} />
                                <TextField
                                    requiredIndicator
                                    label="Shop Id"
                                    placeholder="Enter Shop Id"
                                    value={data?.shop_id}
                                    onChange={(text) => setdata({ ...data, shop_id: text })} />
                                <TextField
                                    requiredIndicator
                                    label="Price"
                                    placeholder="Enter Price"
                                    value={data?.price}
                                    onChange={(text) => setdata({ ...data, price: text })} />
                                <Select
                                    requiredIndicator
                                    label="Status"
                                    placeholder="Select Status"
                                    options={[
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
                                            value: "info"
                                        },
                                    ]}
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
                            <Stack>
                                {(data?.thumb ?? Productinfo?.img) &&
                                    <img
                                        style={{ objectFit: "contain", borderRadius: "5px" }}
                                        height={136}
                                        src={data?.thumb ? URL.createObjectURL(data?.thumb) : Productinfo?.img}
                                        alt='product image' />}
                                <span style={{ minHeight: "136px", display: "block" }}>
                                    <DropZone
                                        allowMultiple={false}
                                        onDrop={(
                                            _dropFiles,
                                            acceptedFiles,
                                        ) => {
                                            if (_dropFiles) {
                                                setdata({ ...data, thumb: acceptedFiles[0] })
                                            }
                                        }}>
                                        <DropZone.FileUpload />
                                    </DropZone>
                                </span>
                            </Stack>
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
                                dataSource={row}
                                scroll={{ x: 1200 }}
                                pagination={false} />
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>

        </Page>
    )
}

export default AddnewProduct;