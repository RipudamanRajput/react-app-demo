import { Button, Card, Checkbox, Page, RadioButton, Stack, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Registration(props) {
  const history = useNavigate();
  useEffect(()=>{
    localStorage.removeItem("Data")
    localStorage.removeItem("Detail")
  },[])
  // ---------------Signed up -----------
  const [detail, setdetail] = useState([
    {
      fname: "",
      lname: "",
      password: "",
      DOB: "",
      gender: "",
      agree: true,
      step:0
    }
  ]);
  const onChangevalue = (e, id) => {
    setdetail(prev => {
      return {
        ...prev,
        [id]: e
      }
    })
  }

  const registration = (e) => {
    const { fname, lname, password, DOB, gender, agree } = detail;

    const data = {
      fname,
      lname,
      password,
      DOB,
      gender,
      agree,
    };
    if (fname && lname && DOB && gender && agree) {
      axios.post('http://localhost:3002/create', data)
        .then((res) => {
          res.data.data ? (swal({
            title: "Registration Successful",
            icon: "success",
            buttons: {
              catch: {
                text: "Login",
                value: "catch",
              }
            }
          })
            .then((value) => {
              if (value) {
                history("/Login")
              }
            })
          ) : swal({
            title: "Error",
            text: 'This password is already used ',
            icon: "error",
          })

        })
        .catch(err => {
          swal({
            title: "Error",
            text: err,
            icon: "error",
          })
        })
    }
    else {
      swal({
        title: "Warning",
        text: "Please Fill all Fields",
        icon: "warning",
      })
    }
  }
  return (
    <div className="authenctication">
      <Page title="Registartion Page">
        <Card sectioned >
          <Stack vertical spacing="tight">
            <TextField
              onChange={(e, id) => onChangevalue(e, id)}
              id="fname"
              name="fname"
              value={detail.fname}
              type="text"
              placeholder="Enter First Name"
              label="First Name"
            />
            <TextField
              onChange={
                (e, id) => onChangevalue(e, id)
              }
              label="Last name"
              id='lname'
              value={detail.lname}
              name='lname'
              type="text"
              placeholder="Enter Last name "
            />
            <TextField
              onChange={(e, id) => onChangevalue(e, id)}
              name='password'
              id="password"
              value={detail.password}
              type="password"
              placeholder="Enter your password"
              label="Password"
            />
            <div className="LRlayout">
              <label> DOB </label>
              <input onChange={(e) => onChangevalue(e.target.value, 'DOB')} name="DOB" type="Date" />
            </div>
            <Stack>
              <RadioButton
                onChange={(e, id) => onChangevalue('male', id)}
                name="gender"
                id="gender"
                value="male"
                label='Male'
              />
              <RadioButton
                onChange={(e, id) => onChangevalue('female', id)}
                name="gender"
                id="gender"
                value="female"
                label='Female'
              />
            </Stack>

            <>
              <Checkbox
                id="agree"
                name="agree"
                onChange={(e, id) => onChangevalue(e, id)}
                checked={detail.agree ? true : false}
                type="checkbox"
                label='Agree'
              />
            </>
            <Stack alignment="fill">
              <Button
                fullWidth
                primary
                onClick={registration}
              >Submit</Button>
              <Button
                fullWidth
                onClick={() => {
                  history('/Login')
                }}>Login</Button>
            </Stack>
          </Stack>
        </Card>
      </Page>

    </div>
  )
}

export default Registration;