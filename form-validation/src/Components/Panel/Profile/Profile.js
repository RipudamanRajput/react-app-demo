import { Card, Page, Stack, TextField, Tag, Modal, Button, TextStyle, Select } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { Space, Table } from 'antd';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Editprofile from "./Components/Editprofile";
import { useSelector } from "react-redux";

function Profile(props) {
    const userId = useSelector((state) => state.login.username._id)
    const history = useNavigate();
    const [modal, setmodal] = useState(false);
    const [cretapop, setcretpop] = useState(false);
    const [addprofile, setaddprofile] = useState({
        name: "",
        category: "",
        rules: "",
        status: ""
    });
    const [data, setdata] = useState();
    const [search, setsearch] = useState();
    const [row, setrow] = useState(data);
    const [editmodaldata, seteditmodaldata] = useState(false);
    const [openedit, setopenedit] = useState(false)

    const viewprofile = (data) => {
        history("View", {
            state: {
                name: data.name,
                category: data.category,
                rules: data.rules,
            }
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <a onClick={() => viewprofile(record)}>{record.name}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Rule(s)',
            dataIndex: 'rules',
            key: 'rules',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { tags, category, name, key }) => (
                <>
                    <Modal
                        activator={<Tag
                            onClick={() => modal === key ? setmodal(-1) : setmodal(key)}
                            color='green'>
                            {tags.toUpperCase()}
                        </Tag>}
                        open={modal === key}
                        title="Rule Group"
                        onClose={() => setmodal(!modal)}>
                        <Modal.Section>
                            {`${name} cc`} modal content
                        </Modal.Section>
                    </Modal>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => viewprofile(record)}>View</a>
                    <a
                        onClick={() => {
                            seteditmodaldata(record)
                            setopenedit(true)
                        }}
                    >Edit</a>
                </Space>
            ),
        },
    ];

    const addprofiledetail = ({ name, category, rules, status }) => {
        const data = { userId, name, category, rules, status }
        if (!name, !category, !rules, !status) {
            swal({
                title: "Fill All Fields",
                icon: "warning",
                buttons: {
                    catch: {
                        text: "Cancel",
                        value: "catch",
                    },
                },
            })

        } else {
            axios.post('http://localhost:3002/CreateProfiele', data).then((res, err) => {
                if (err) throw err;
                if (res) {
                    setcretpop(!cretapop)
                    swal({
                        title: "Profile created",
                        icon: "success",
                        buttons: {
                            catch: {
                                text: "Cancel",
                                value: "catch",
                            }
                        }
                    })
                }
            })
        }
    }
    useEffect(() => {
        const arr = [];
        axios.post('http://localhost:3002/allProfiles', { userId }).then((res, err) => {
            if (res) {
                res.data.status.forEach(item => {
                    return [
                        arr.push({
                            key: item?._id,
                            name: item?.name,
                            category: item?.category,
                            rules: item?.rules,
                            tags: 'View rule',
                        })
                    ]
                })
                setdata(arr)
            }
            if (err) throw err;
        }).catch((err) => {
            console.log(err);
        })
    }, [openedit, cretapop])

    useEffect(() => {
        const containsKeyword = (val) => typeof val === "string" && val.indexOf(search) !== -1;
        let filtered = data?.filter(entry => Object.keys(entry).map(key => entry[key]).some(containsKeyword));
        search ? setrow(filtered) : setrow(data)
    }, [search])

    return (
        <>
            <Page
                title="Profile"
                fullWidth>
                <Card>
                    <Card.Section>
                        <Stack >
                            <TextField
                                placeholder="Search Profile"
                                value={search}
                                onChange={(data) => setsearch(data)} />
                            <Button
                                onClick={() => setcretpop(!cretapop)}>Create Profile</Button>
                        </Stack>
                    </Card.Section>
                    <Card.Section>
                        <Table columns={columns} dataSource={row ? row : data} />
                    </Card.Section>
                </Card>
            </Page>
            {/* craete profile modal */}
            <Modal
                small
                title="Create Your Profile"
                open={cretapop}
                onClose={() => setcretpop(!cretapop)}>
                <Card
                    primaryFooterAction={{
                        content: "Save",
                        onClick: () => addprofiledetail(addprofile)
                    }}
                    secondaryFooterActions={[
                        {
                            content: "Cancel",
                            onAction: () => setcretpop(!cretapop)
                        }
                    ]}>
                    <Card.Section>
                        <Stack vertical>
                            <Stack distribution="equalSpacing" alignment="center">
                                <TextStyle variation="strong">
                                    Name
                                </TextStyle>
                                <TextField
                                    placeholder="Enter Name "
                                    value={addprofile?.name}
                                    onChange={(text) => {
                                        setaddprofile({ ...addprofile, name: text })
                                    }} />
                            </Stack>
                            <Stack distribution="equalSpacing" alignment="center">
                                <TextStyle variation="strong">
                                    Category
                                </TextStyle>
                                <Select
                                    placeholder="Select Status"
                                    options={[
                                        {
                                            label: "Default",
                                            value: "default"
                                        },
                                        {
                                            label: "Custom",
                                            value: "custom"
                                        }
                                    ]}
                                    value={addprofile?.category}
                                    onChange={(text) => {
                                        setaddprofile({ ...addprofile, category: text })
                                    }} />

                            </Stack>
                            <Stack distribution="equalSpacing" alignment="center">
                                <TextStyle variation="strong">
                                    Rule(s)
                                </TextStyle>
                                <TextField
                                    placeholder="Enter Rule(s) "
                                    value={addprofile?.rules}
                                    onChange={(text) => {
                                        setaddprofile({ ...addprofile, rules: text })
                                    }} />
                            </Stack>
                            <Stack distribution="equalSpacing" alignment="center">
                                <TextStyle variation="strong">
                                    Status
                                </TextStyle>
                                <TextField
                                    placeholder="Enter Category "
                                    value={addprofile?.status}
                                    onChange={(text) => {
                                        setaddprofile({ ...addprofile, status: text })
                                    }} />
                            </Stack>
                        </Stack>
                    </Card.Section>
                </Card>
            </Modal>
            <Editprofile
                data={editmodaldata}
                open={openedit}
                close={setopenedit}
            />

        </>
    )
}
export default Profile;