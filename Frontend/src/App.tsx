import React, { useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import { TextStyle, } from '@shopify/polaris';
import Registration from './Components/Auth/Registration'
import Login from './Components/Auth/Login';
// import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate, } from 'react-router-dom';
import Panel from './Components/Panel/Panel';

function App() {
  // const userID = useSelector((state) => state.login.username)
  const data = JSON.parse(localStorage.getItem("Data") as string)
  // const history = useNavigate();
  // useEffect(()=>{
  //   data?.data?._id  && history('panel/dashboard')
  // },[])
  
    return (
      
    <Routes>
      <Route path='' element={<Registration />} />
      <Route path='login' element={<Login />} />
      <Route
        path='panel/*'
        element={<Panel data={data} />} />
      <Route path='*' element={<TextStyle>404 Page Not Found</TextStyle>} />
    </Routes >
  )
}



export default App;
