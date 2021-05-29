import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react"
import Header from "../header/header"
import Error from "../Page404/Page404"
const useStyle = makeStyles((theme) => ({
    content: {
        position: "relative",
        marginTop: "2em",
        marginRight: "40em",
        marginLeft: "40em",
        border: "1px solid whitesmoke",
        height: "100%",
        [theme.breakpoints.down("md")]: {
            marginRight: "20em",
            marginLeft: "20em",
        },
        [theme.breakpoints.down("sm")]: {
            marginRight: "10em",
            marginLeft: "10em",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: "2em",
            marginLeft: "2em",
        },
    },
    image: {
        marginBottom: "1em",
        maxWidth: "100%",
    },
    title:{
        position: "relative",
        marginTop: "6em",
        marginRight: "40em",
        marginLeft: "40em",
        [theme.breakpoints.down("md")]: {
            marginRight: "20em",
            marginLeft: "20em",
        },
        [theme.breakpoints.down("sm")]: {
            marginRight: "10em",
            marginLeft: "10em",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: "2em",
            marginLeft: "2em",
        },
    },
}));
const Correspondence = (props) => {
    const classes = useStyle();
    const [news, setNews] = useState([]);
    const [hrefs, setHrefs] = useState([]);
    const dateFormat = new Date(news.date);
    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    useEffect(() => {
        setHrefs(news.href);
    }, [news.href])
    useEffect(() => {
        setNews(props.newsData);
    }, [props.newsData])
    if (news.length === 0) {
        return (
            <Error />
        )
    }
    else {
        return (
            <div>
                <Header />
                <div className={classes.title}><h1>{news.title}</h1></div>
                <div className={classes.content} key={news.id}>
                    {news.image.includes("http") ? <img className={classes.image} src={news.image} alt={news.title} />: <img className={classes.image} src={`/img/${news.image}`} alt={news.title} />}
                    <div style={{ marginBottom: "3em" }}>{news.content}<div />
                        <br />
                        <b>{dateFormat.toLocaleString("ukr", options)}</b>
                        {news.href === null ? <div></div>
                            :
                            <div style={{ color: "red", marginTop: "2em" }}>
                                Посилання на джерело:
                        <a href={hrefs}>*</a></div>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Correspondence