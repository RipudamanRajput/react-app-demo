import { Avatar, Card, DropZone, Icon, Modal, Stack, TextStyle, TopBar } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditMajor, } from '@shopify/polaris-icons';
import axios from "axios";

function TopbarPannel(props: any) {
    const { fname, lname, _id, gender, DOB } = props.data;

    const [editmodal, seteditmodal] = useState(false);
    const [editprfile, seteditprofile] = useState(false);
    const [img, setimg] = useState<any>();
    const [profilepicimg, setprofilepicimg] = useState();

    const history = useNavigate();
    const userID = useSelector((state: any) => state.login.username)
    const [menuopen, setmenuopen] = useState(false)

    const changeprofile = () => {
        axios.post('http://localhost:3002/detail', { fname, lname, DOB }).then((res) => {
            if (res.data) {
                res.data.data.forEach((element: any) => {
                    setprofilepicimg(element.profilepic)
                });
            }
        })
    }
    useEffect(() => {
        changeprofile()
    }, [editmodal])

    // file upload fun..
    const apidata = (data: any) => {
        setimg(data)
        seteditprofile(false)
    }

    const handleDropZone:any = useCallback(async (
        _dropFiles: any,
        acceptedFiles: any,
        _rejectedFiles: any
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
                .then((res) => {
                    apidata(res.data)
                    changeprofile();
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
                                        window.location.reload()
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
                    name={`${userID?.fname}`}
                    detail={`${userID?._id}`}
                    avatar={profilepicimg}
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
                                            src={img?.Imginfo?.url ? img?.Imginfo?.url : profilepicimg}
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