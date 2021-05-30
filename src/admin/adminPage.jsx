import Update from './update/uppdateForm'
import { useEffect, useState } from "react"
import {BrowserRouter, Redirect, Route } from "react-router-dom"
import SignIn from "../login/login-page/login-page"
import Task from './task/task'
const { Paper, Accordion, AccordionSummary, Typography, AccordionDetails } = require("@material-ui/core")
const { default: AddForm } = require("./add/addForm")
const { default: DeleteForm } = require("./delete/deleteForm")
const Admin = () => {
    const [status,setStatus] = useState({status: "Autorize"});
    useEffect(()=>{
        fetch("https://obscure-taiga-00490.herokuapp.com:4123/cookie",{
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
            <Redirect to="/auth"/>
            <Route path="/auth" component={SignIn}/>
            </BrowserRouter>
        )
    }
    else
    {
    return (
        <Paper>
            <a  href="https://obscure-taiga-00490.herokuapp.com:4123/logOut">LogOut</a>
            <Accordion>
                <AccordionSummary>
                    <Typography>Добавити новину</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddForm />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Видалити новину</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DeleteForm />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Редагувати новину</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Update/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Завдання</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Task/>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
    }
}
export default Admin
