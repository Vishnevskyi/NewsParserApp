import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  header:{
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "red",
    zIndex: 1000,
    width: "100%",
},
headerLink:{
    color: "white",
    textDecoration:"none",
    textTransform: "uppercase",
    fontSize: "1rem",
    '&:hover':{
        backgroundColor: "white",
        padding: "10px",
        color: "black",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "13px"
    },
},
headerList:{
  display: "flex",
  zIndex: 2,
  '& li':{
    listStyleType: "none",
    margin: "0 0 0 20px",
  },
},
headerTitle:{
    maxWidth: "100%",
    overflow: "hidden",
    fontSize: "2.8rem",
    fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
    color: "white",
    zIndex: 3,
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "2rem"
    },
},
headerBody:{
    display: "flex",
    height: "80px",
    alignItems: "center",
    margin: "0 21em 0 20em",
    justifyContent: 'space-between',
    [theme.breakpoints.down("md")]: {

  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 5em 0 5em",
  },
  [theme.breakpoints.down("xs")]: {
    margin: "0 2em 0 1em",
  },
  [theme.breakpoints.only("md")]: {
    margin: "0 13em 0 11em",
  },
},
}));
const HeaderEach = () =>{
    const classes = useStyle();
    return(
        <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.headerBody}>
          <Link className={classes.headerTitle} to="/">Ukraine Post</Link>
            <div class="header_burger">
              <span></span>
            </div>
            <nav class="header_menu">
              <ul class={classes.headerList}>
                <li>
                  <Link className={classes.headerLink} to="/about">About Us</Link>
                </li>
                <li>
                <Link className={classes.headerLink} to="/login">SignIn</Link>
                </li>
              </ul>
              </nav>
            </div>
          </div>
    </header> 
    )
}
export default HeaderEach