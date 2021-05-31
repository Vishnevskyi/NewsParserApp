import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@material-ui/core'
import Update from './update/uppdateForm'
import AddForm from "./add/addForm"
import DeleteForm from "./delete/deleteForm"
import Task from "./task/task"
const AdminPage = () =>{
return(
    <Paper>
    <a  href="https://polar-castle-45110.herokuapp.com/logOut">LogOut</a>
    <Accordion>
        <AccordionSummary>
            <Typography>Добавити новину</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <AddForm/>
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
export default AdminPage