import { makeStyles } from "@material-ui/core"
import Header from "../header/header"
const useStyle = makeStyles((theme)=>({
    content:{
        position: "fixed",
        width: "100%",
        top: "37%",
        left: "42%",
        fontSize: "14rem",
        [theme.breakpoints.only("xs")]: {
            top: "31%",
            left: "37%",
            fontSize: "5rem",
          },
          [theme.breakpoints.only('md')]: {
            top: "33%",
            left: "34%",
          },
          [theme.breakpoints.only('sm')]: {
            fontSize: "7rem"
          },
    }
}))
const Page404 = () =>{
    const classes = useStyle();
    return(
        <div><Header/><div className={classes.content}>404</div></div>
    )
}
export default Page404