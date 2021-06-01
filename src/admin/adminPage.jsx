import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@material-ui/core'
import Update from './update/uppdateForm'
import AddForm from "./add/addForm"
import DeleteForm from "./delete/deleteForm"
import Task from "./task/task"
import { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import SignIn from '../login/login-page/login-page'
const AdminPage = () => {
    const [status, setStatus] = useState({ status: "Autorize" });
    useEffect(() => {
        fetch("http://localhost:4000/api/cookie", {
            method: "POST",
            mode: "cors",
            body: document.cookie,
            credentials: "include"
        })
            .then(async (res) => await res.json())
            .then(async (res) => await setStatus(res))
    }, [])
    if (status.message === "Unauthorized") {
        return (
            <BrowserRouter>
                <Redirect exact to="/login" />
                <Route exact path="/login" component={SignIn} />
            </BrowserRouter>
        )
    }
    return (
        <Paper>
            <a href="http://localhost:4000/api/logOut">LogOut</a>
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
                    <Update />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Завдання</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Task />
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}
export default AdminPage