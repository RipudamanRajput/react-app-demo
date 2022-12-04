import { Card, DropZone, Icon, Modal, Stack, TextStyle, TopBar } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditMajor, } from '@shopify/polaris-icons';
import axios from "axios";

function TopbarPannel(props) {
    const { fname, lname, _id, gender, DOB, profilepic } = props.data;

    const [editmodal, seteditmodal] = useState(false);
    const [editprfile, seteditprofile] = useState(false);
    const [img, setimg] = useState();

    const history = useNavigate();
    const userID = useSelector((state) => state.login.username)
    const [menuopen, setmenuopen] = useState(false)


    // file upload fun..
    const apidata = (data) => {
        setimg(data)
        seteditprofile(false)
    }

    const handleDropZone = useCallback(async (
        _dropFiles,
        acceptedFiles,
        _rejectedFiles
    ) => {
        var details = JSON.stringify({
            fname: fname,
            lname: lname,
            DOB: DOB,
            gender: gender
        });
        var formdata = new FormData();
        formdata.append(`image`, acceptedFiles[0], acceptedFiles[0].name);
        formdata.append('data', details);
        _dropFiles &&
            await axios.post('http://localhost:3002/upload', formdata)
                .then((res, err) => {
                    if (err) throw err;
                    apidata(res.data)
                    props.setprofile(res.data)

                })
                .catch((err) => {
                    console.log("errorro", err)
                })
    }, [],);


    return (
        <>
            <TopBar
                showNavigationToggle
                userMenu={<TopBar.UserMenu
                    actions={[
                        {
                            items: [
                                {
                                    content: "Logout",
                                    onAction: () => {
                                        history('/login')
                                        localStorage.removeItem('Data')
                                    }
                                },
                                {
                                    content: "View Profile",
                                    onAction: () => {
                                        seteditmodal(true)
                                    }
                                }
                            ]
                        },
                    ]}
                    name={`${userID.fname}`}
                    detail={`${userID._id}`}
                    avatar={profilepic}
                    initials={`${userID?.fname?.substring(0, 1)}`}
                    open={menuopen}
                    onToggle={() => { setmenuopen(!menuopen) }}
                />} />
            <Modal
                open={editmodal}
                title="User Profile"
                onClose={() => { seteditmodal(false) }}>

                <Card sectioned  >
                    <Stack spacing="loose">
                        <Stack>
                            <div className="progile-img">
                                {editprfile
                                    ?
                                    <span style={{ height: "200px", width: "200px", display: "block" }}>
                                        <DropZone onDrop={handleDropZone}>
                                            <DropZone.FileUpload />
                                        </DropZone>
                                    </span>
                                    : <>
                                        <img
                                            src={img?.Imginfo?.url ? img?.Imginfo?.url : profilepic}
                                            height={200}
                                            width={200}
                                            alt="Profile pic" />


                                        <span
                                            onClick={() => {
                                                seteditprofile(true)
                                            }}
                                            className="profile-change-icon">
                                            <Icon
                                                source={EditMajor}
                                                color="primary"
                                            />
                                        </span>
                                    </>
                                }
                            </div>
                        </Stack>
                        <Stack vertical>
                            <Stack>
                                <TextStyle variation="strong">User ID</TextStyle>
                                <TextStyle>
                                    {_id}
                                </TextStyle>
                            </Stack>
                            <Stack>
                                <TextStyle variation="strong">First Name</TextStyle>
                                <TextStyle>
                                    {fname}
                                </TextStyle>
                            </Stack>
                            <Stack>
                                <TextStyle variation="strong">Last Name</TextStyle>
                                <TextStyle>
                                    {lname}
                                </TextStyle>
                            </Stack>
                            <Stack>
                                <TextStyle variation="strong">Gender</TextStyle>
                                <TextStyle>
                                    {gender}
                                </TextStyle>
                            </Stack>
                            <Stack>
                                <TextStyle variation="strong">Date Of Birth</TextStyle>
                                <TextStyle>
                                    {DOB}
                                </TextStyle>
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            </Modal>
        </>
    )
}
export default TopbarPannel;