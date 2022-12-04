import { Card, Page, Stack, TextField, Tag, Modal, Button, TextStyle, Select } from "@shopify/polaris";
import React, { useState } from "react";
import { Space, Table } from 'antd';
import { useNavigate } from "react-router-dom";

function Profile(props) {
    const history = useNavigate();
    const [modal, setmodal] = useState(false);
    const [cretapop, setcretpop] = useState(false);
    const [addprofile, setaddprofile] = useState({
        name: "",
        category: "",
        rules: "",
        status: ""
    });

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
                    <a>Edit</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            category: 32,
            rules: 'New York No. 1 Lake Park',
            tags: 'View rule',
        },
        {
            key: '2',
            name: 'Jim Green',
            category: 42,
            rules: 'London No. 1 Lake Park',
            tags: 'View rule',
        },
        {
            key: '3',
            name: 'Joe Black',
            category: 32,
            rules: 'Sidney No. 1 Lake Park',
            tags: 'View rule',
        },
    ];

    const { name, category, rules, status } = addprofile
    const addprofiledetail = ({ name, category, rules, status }) => {
        if (!name, !category, !rules, !status) {
            console.error('errr')
        }
    }
    return (
        <>
            <Page
                title="Profile"
                fullWidth>
                <Card>
                    <Card.Section>
                        <Stack >
                            <TextField placeholder="Search Profile" />
                            <Button
                                onClick={() => setcretpop(!cretapop)}>Create Profile</Button>
                        </Stack>
                    </Card.Section>
                    <Card.Section>
                        <Table columns={columns} dataSource={data} />
                    </Card.Section>
                </Card>
            </Page>
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
                                error={name}
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
                                <TextField
                                    placeholder="Enter Category "
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
                                    value={addprofile?.status}
                                    onChange={(text) => {
                                        setaddprofile({ ...addprofile, status: text })
                                    }} />
                            </Stack>
                        </Stack>
                    </Card.Section>
                </Card>
            </Modal>
        </>
    )
}
export default Profile;