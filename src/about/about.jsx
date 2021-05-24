import { makeStyles } from "@material-ui/core"
import Header from "../header/header"
const useStyle = makeStyles((theme)=>({
    content:{
        borderBottom: "1px solid red",
        margin: "3em 9em 0 9em",
        padding: "1em",
        fontSize: "2rem",
        [theme.breakpoints.down("md")]: {
            margin: "3em 2em 0 2em",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "20px",
            margin: "5em 3em 0 3em",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px",
            margin: "7em 0 0 0",
        },
        [theme.breakpoints.only("md")]: {
            margin: "3em 6em 0 5em",
            fontSize: "30px",
          },
    }
}))
const AboutUs = () => {
    const classes = useStyle();
    return (
        <div><Header /><div className={classes.content}>Ukraine Post - це незалежне інтернет-видання</div></div>
    )
}
export default AboutUs