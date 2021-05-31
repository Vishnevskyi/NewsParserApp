import { useEffect, useState } from "react"
import {BrowserRouter, Redirect, Route } from "react-router-dom"
import SignIn from "../login/login-page/login-page"
import AdminPage from "./adminPage";
const Admin = () => {
    const [status,setStatus] = useState({status: "Autorize"});
    useEffect(()=>{
        fetch("https://polar-castle-45110.herokuapp.com/cookie",{
            method: "POST",
            mode: "cors",
            body: document.cookie,
            credentials: "include"
        })
        .then(async(res)=> await res.json())
        .then(async(res)=> await setStatus(res))
    },[])
    if (status.message === "Unauthorized")
    {
        return(
            <BrowserRouter>
            <Redirect to="/login"/>
            <Route path="/login" component={SignIn}/>
            </BrowserRouter>
        )
    }
    else
    {
    return (
     <BrowserRouter>
     <Redirect to="mypage"/>
     <Route path="/mypage" component={AdminPage}/>
     </BrowserRouter>
    )
    }
}
export default Admin