import axios, { AxiosPromise, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector, shallowEqual } from "react-redux";
import swal from 'sweetalert';
import { Button, Card, Page, Stack, TextField } from "@shopify/polaris";


function Login() {
  // const userID = useSelector((sate) => sate.login.username, shallowEqual)
  const history = useNavigate();
  // -----------------Login Process------------
  const [logindetail, setlogindetail] = useState<any>([
    {
      fname: "",
      password: "",
    }
  ])
  const onLoginchange = (e: string | number, id: string | number) => {
    setlogindetail((prev: any) => {
      return {
        ...prev,
        [id]: e
      }
    })
  }
  useEffect(() => {
    localStorage.removeItem("Data")
  }, [])

  const setstep = (data: Object, step: number) => {
    const query = { ...data, step: step }
    axios.post('http://localhost:3002/stepchange', query)
    // .then((res, error) => {
    //   if (error) throw error;
    //   console.log("data", res)
    // })
  }

  const Loginuser = () => {
    const { fname, password } = logindetail;

    const cred = {
      fname,
      password
    };

    axios.post('http://localhost:3002/Login', cred)
      .then((res) => {
        const { _id, fname, lname, DOB, profilepic, step, gender } = res.data[0]

        const data = {
          _id, fname, lname, DOB, profilepic, step, gender
        }
        res.data ?
          (
            swal({
              title: "Login Successful",
              icon: "success",
              buttons: {
                catch: {
                  text: "Go To Dashboard",
                  value: "catch",
                }
              }
            })
              .then((value) => {
                if (value) {
                  setstep(cred, 1);
                  history("/panel/Dashboard")
                  window.location.reload()
                }
              })

          )
          : swal({
            title: "Warning",
            text: "Please fill correct username and password",
            icon: "error",
          });

        localStorage.setItem("Data", JSON.stringify(data));

      })
      .catch(err => {
        console.log("incorrect cred", err)
        swal({
          title: "Error",
          text: err.toString(),
          icon: "error",
        })
      })

  }
  return (
    <>
      <div className="authenctication">
        <Page title="Login">
          <Card sectioned subdued>
            <Stack vertical spacing="tight">
              <Stack.Item>
                <TextField
                  id="fname"
                  name="fname"
                  autoComplete="off"
                  label="Username"
                  value={logindetail.fname}
                  onChange={(value, id) => onLoginchange(value, id)}
                  type={'text'}
                  placeholder={'Enter your Username'} />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  id="password"
                  autoComplete="off"
                  onChange={(value, id) => onLoginchange(value, id)}
                  value={logindetail.password}
                  type={'password'}
                  placeholder="Enter your password"
                  name="password"
                  label="Password"
                />
              </Stack.Item>
              <Stack spacing="tight">
                <Button primary onClick={Loginuser}>Login</Button>
                <Button
                  onClick={() => {
                    history('/');
                  }
                  }>Sign Up</Button>
              </Stack>
            </Stack>
          </Card>
        </Page>
      </div>
    </>
  )
}

export default Login;