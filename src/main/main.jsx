import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react"
import { BrowserRouter, NavLink } from "react-router-dom";
import NavbarUnauto from "./navbar";
const useStyle = makeStyles((theme) => ({
    mainBlock: {
        display: 'flex',
        flexWrap: "wrap",
        padding: "1em",
        marginRight: "20em",
        marginLeft: "20em",
        border: "1px solid whitesmoke",
        [theme.breakpoints.down("md")]: {
            marginRight: "10em",
            marginLeft: "10em",
        },
        [theme.breakpoints.down("sm")]: {
            marginRight: "5em",
            marginLeft: "5em",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: "1em",
            marginLeft: "1em",
        },
    },
    article: {
        width: "20%",
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
    },
    main: {
        width: "65%",
        marginRight: "1em",
        marginLeft: "1em",
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
        [theme.breakpoints.up("sm")]: {
            width: "60%"
        },
    },
    later: {
        width: "10%",
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
    },
    title: {
        color: "black",
        borderBottom: "1px solid red"
    },
    img: {
        width: "100%"
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
}));
const Main = () => {
    debugger;
    const classes = useStyle();
    const [news, setNews] = useState([]);
    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    useEffect(() => {
        fetch("https://murmuring-forest-06470.herokuapp.com/api/news", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setNews(res))
            .catch((err) => setNews(err))
    }, [])
    const [article, setArticle] = useState([]);
    useEffect(() => {
        fetch("https://murmuring-forest-06470.herokuapp.com/api/article", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setArticle(res))
            .catch((err) => setArticle(err))
    }, [])
    const [later, setLater] = useState([]);
    useEffect(() => {
        fetch("https://murmuring-forest-06470.herokuapp.com/api/later", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setLater(res))
            .catch((err) => setLater(err))
    }, [])
    return (
        <div>
            <NavbarUnauto />
            <div className={classes.mainBlock}>
                <div className={classes.article}>
                    <h2 className={classes.title}>Articles</h2>
                    {article.map((res) => (
                        <BrowserRouter>
                            <NavLink
                                className={classes.link}
                                target="_blank"
                                to={`/article/${res.id}`}
                                key={res.id}>
                                {res.title}
                            </NavLink>
                            <hr />
                            <br />
                            {/* <Route path='/read' exact render={props => <Article newsData={res} />} />
                    {/* <Button type="link" onClick={()=> history.push({
                    pathname: `/read/${res.id}`,
                    state: res    
                    })}
                    >
                    {res.title}
                    </Button> */}
                        </BrowserRouter>
                    ))}
                </div>
                <div className={classes.main}>
                    <h2 className={classes.title}>Main news</h2>
                    {news.map((res) => (
                        <Accordion key={res.id}>
                            <AccordionSummary>
                                <Typography><h3>{res.title}</h3>{res.image.includes("http") ? <img className={classes.img} src={res.image} alt={res.title} /> : <img className={classes.img} src={`/img/${res.image}`} alt={res.title} />}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {res.content}
                            </AccordionDetails>
                            <b>{new Date(res.date).toLocaleString("ukr", options)}</b>
                            <br />
                            {res.href === null ? <div></div> : <p>Посилання: <a href={res.href}>*</a></p>}
                        </Accordion>
                    ))}
                </div>
                <div className={classes.later}>
                    <h2 className={classes.title}>Later</h2>
                    {later.map((res) => (
                        <div key={res.id}><i>#{res.id}</i><br />
                            <NavLink
                                className={classes.link}
                                target="_blank"
                                to={`/read/${res.id}`}
                                key={res.id}>
                                {res.title}
                            </NavLink>
                            <br />
                            <em>
                                {new Date(res.date).toLocaleString("ukr", options)}
                            </em>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Main
