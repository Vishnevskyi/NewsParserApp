import React, { useEffect, useState } from "react";
import loginPage from "./login/login-page/login-page";
import MainPage from "./main/main"
import adminPage from "./admin/adminPage"
import { BrowserRouter,Redirect,Route, Switch } from "react-router-dom";
import Article from "./article/article";
import NotFound from "./Page404/Page404"
import Correspondence from "./correspondence/correspondence"
import aboutPage from "./about/about"
function App() {
    const [article, setArticle] = useState([]);
    useEffect(() => {
        fetch("https://polar-castle-45110.herokuapp.com/article", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setArticle(res))
            .catch((err) => setArticle(err))
    }, [])
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("https://polar-castle-45110.herokuapp.com/news", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setNews(res))
            .catch((err) => setNews(err))
    }, [])
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
            <Switch>
                <Route exact path="/" component={MainPage} />
                {article.map((res) => (
                    <Route exact path={`/article/${res.id}`} component={() => <Article newsData={res} />} />
                ))}
                {news.map((res) => (
                    <Route exact path={`/read/${res.id}`} component={() => <Correspondence newsData={res} />} />
                ))}
                <Route exact path="/about" component={aboutPage} />
                <Route exact path="/mypage" component={adminPage} />
                <Route exact path="/login" component={loginPage} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
        )
    }
        return (
            <BrowserRouter>
            <Redirect to="mypage"/>
            <Route path="/mypage" component={AdminPage}/>
            <Route component={NotFound} />
            </BrowserRouter>
        )
}

export default App;
