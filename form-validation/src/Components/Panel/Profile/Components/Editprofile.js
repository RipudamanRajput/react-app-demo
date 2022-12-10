import { Card, Modal, TextStyle, Stack, Select, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";

function Editprofile(props) {
    const userId = useSelector((state) => state.login.username._id)
    const { category, key, name, rules } = props.data
    const [addprofile, setaddprofile] = useState({
        name: "",
        category: "",
        rules: "",
        status: ""
    });

    const deleteProfile = () => {
        axios.post('http://localhost:3002/deleteProfile', { name, category, key, rules }).then((res, err) => {
            if (res) {
                swal({
                    title: "Profile Deleted",
                    icon: "success",
                    buttons: {
                        catch: {
                            text: "Cancel",
                            value: "catch",
                        }
                    }
                })
                props.close(false)
            } else {
                throw err
            }
        }).catch((err) => {
            swal({
                title: "Error",
                text: err,
                icon: "error",
                buttons: {
                    catch: {
                        text: "Cancel",
                        value: "catch",
                    }
                }
            })
        })
    }

    const updateprofile = () => {
        const data = {
            query: {
                name,
                category,
                rules
            },
            data: {
                userId: userId,
                name: addprofile.name ? addprofile.name : name,
                category: addprofile.category ? addprofile.category : category,
                rules: addprofile.rules ? addprofile.rules : rules
            },
            dbname: "admin",
            collection: "Profiles"
        }
        axios.post('http://localhost:3002/updateProfile', { data })
            .then((res, err) => {
                if (res) {
                    swal({
                        title: "Profile Updated",
                        icon: "success",
                        buttons: {
                            catch: {
                                text: "Cancel",
                                value: "catch",
                            }
                        }
                    })
                    props.close(false)
                } else {
                    throw err
                }
            }).catch((err) => {
                swal({
                    title: "Error",
                    text: err,
                    icon: "error",
                    buttons: {
                        catch: {
                            text: "Cancel",
                            value: "catch",
                        }
                    }
                })
            })
    }

    return (
        <Modal
            title="Edit Profile"
            open={props.open}
            onClose={() => props.close(false)}
        >
            <Card
                primaryFooterAction={{
                    content: "Save",
                    onClick: () => updateprofile()
                }}
                secondaryFooterActions={[
                    {
                        content: "Cancel",
                        onAction: () => props.close(false)
                    },
                    {
                        content: "Delete",
                        onAction: () => deleteProfile()
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
                                value={addprofile.name ? addprofile.name : name}
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
                                value={addprofile.category ? addprofile.category : category}
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
                                value={addprofile.rules ? addprofile.rules : rules}
                                onChange={(text) => {
                                    setaddprofile({ ...addprofile, rules: text })
                                }} />
                        </Stack>
                    </Stack>
                </Card.Section>
            </Card>
        </Modal>
    )
}

export default Editprofile;