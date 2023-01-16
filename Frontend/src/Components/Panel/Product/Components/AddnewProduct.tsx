import { Card, Page, Stack, TextField, Layout, DropZone, Select, Button, } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

function AddnewProduct(title: any | string) {
    const Productinfo = useLocation()?.state;
    const userId = useSelector((state: any | string) => state.login.username._id)
    const [data, setdata] = useState<any>()
    console.log(data, 'data')

    // Edit Product Varinet append 
    useEffect(() => {
        const detail = {
            name: Productinfo?.title,
            shop_id: Productinfo?.shop_id,
            price: Productinfo?.price,
            status: Productinfo?.status,
            proimg: Productinfo?.img
        }
        const ar: any = [];
        Productinfo?.varient && Productinfo?.varient.forEach((element: any | string, index: number) => {
            ar.push({
                varient_id: element?.varient_id,
                shop_id: element?.shop_id,
                price: element?.price,
                status: element?.status,
                varientimg: element?.varientimg
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
            render: (_: any | Event, record: any | object, index: number | any) =>
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
            render: (_: any | Event, record: any | object, index: number | any) => <input
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
            render: (_: any | Event, record: any | object, index: number | any) => <input
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
            render: (_: any | Event, record: any | object, index: number | any) => <input
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
            render: (_: any | Event, record: any | object, index: number | any) =>
                <Stack>
                    {data?.varient?.[index]?.varientimg &&
                        <img width={"80px"} src={!data?.varient?.[index]?.varientimg?.name ? data?.varient?.[index]?.varientimg : URL.createObjectURL(data?.varient?.[index]?.varientimg)} alt={'product image'} />
                    }
                    <span className="varinet-image">
                        <DropZone
                            allowMultiple={false}
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

                </Stack>

        },
        {
            dataIndex: "action",
            title: "Action",
            render: (_: any | Event, record: any | object, index: number | any) => index !== 0 && <a onClick={() => deleterow(record, index)}>Delete</a>
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

    const deleterow = (record: Object | any, index: number) => {
        const arr = row.filter(item => {
            if (item !== record) {
                delete data?.varient[index]
                return (item)
            }
        })
        setrow(arr)
    }

    const Error = (data: string | any) => swal({
        title: data ,
        icon: "error",
        buttons: {
            catch: {
                text: "Cancel",
                value: "catch",
            }
        }
    })

    const Success = (data: string | any) => swal({
        title: data,
        icon: "success",
        buttons: {
            catch: {
                text: "Cancel",
                value: "catch",
            }
        }
    })

    const addproduct = (Apiname: string) => {
        var formdata = new FormData();
        if (data) {
            const { name, shop_id, price, status, thumb, varient, } = data;
            if (Apiname === "insert") {
                var details: any = JSON.stringify({
                    name: name,
                    shop_id: shop_id,
                    price: price,
                    status: status,
                    varient: varient,
                    userId: userId,
                });
            }
            if (Apiname === "update") {
                var details: any = JSON.stringify({
                    product_id: Productinfo?.id,
                    name: name,
                    shop_id: shop_id,
                    price: price,
                    status: status,
                    varient: varient,
                    userId: userId,
                    proimg: !thumb && Productinfo?.img
                });
            }
            let arr: any = [];
            if (varient) {
                Object.keys(varient).filter(elements => {
                    if (!varient[elements]?.varientimg) {
                        Error("Kindly Select Varient Image")
                    }
                    if (varient[elements]?.varientimg.name) {
                        arr.push(
                            {
                                file: varient[elements]?.varientimg,
                                name: varient[elements]?.varient_id
                            }
                        )
                    }
                })
                const files = (varient && thumb) ?
                    [...arr, { file: thumb, name: shop_id }]
                    : (varient && !thumb) ?
                        arr
                        : [{ file: thumb, name: shop_id }]

                files.map((data: any | File, index: any | number) => {
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

            if (name && shop_id && price && status) {
                if (Apiname === "update") {
                    axios.post('http://localhost:3002/updateProduct', formdata).then((res) => {
                        Success("Updated Successfully ");
                    })
                }
                if (Apiname === "insert") {
                    axios.post('http://localhost:3002/addProduct', formdata).then((res) => {
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
                Error("Kindly Fill All recommended Fields")
            }
        } else {
            Error("Kindly Fill All recommended Fields")
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
                                    autoComplete="off"
                                    placeholder="Enter product Id"
                                    value={data?.name}
                                    onChange={(text) => setdata({ ...data, name: text })} />
                                <TextField
                                    requiredIndicator
                                    label="Shop Id"
                                    autoComplete="off"
                                    placeholder="Enter Shop Id"
                                    value={data?.shop_id}
                                    onChange={(text) => setdata({ ...data, shop_id: text })} />
                                <TextField
                                    autoComplete="off"
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