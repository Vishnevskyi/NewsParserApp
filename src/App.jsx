import React, { useEffect, useState } from "react";
import adminPage from "./admin/adminPage";
import loginPage from "./login/login-page/login-page";
import MainPage from "./main/main"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Article from "./article/article";
import NotFound from "./Page404/Page404"
import Correspondence from "./correspondence/correspondence"
import aboutPage from "./about/about"
function App() {
    const [article, setArticle] = useState([]);
    useEffect(() => {
        fetch("https://murmuring-forest-06470.com/api/article", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setArticle(res))
            .catch((err) => setArticle(err))
    }, [])
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("https://murmuring-forest-06470.com/api/news", {
            method: "POST",
            mode: "cors"
        })
            .then((res) => res.json())
            .then((res) => setNews(res))
            .catch((err) => setNews(err))
    }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                {article.map((res) => (
                    <Route exact path={`/article/${res.id}`} component={() => <Article newsData={res} />} />
                ))}
                {news.map((res) => (
                    <Route exact path={`/read/${res.id}`} component={() => <Correspondence newsData={res} />} />
                ))}
                <Route exact path="/about" component={aboutPage}/>
                <Route exact path="/auth" component={loginPage} />
                <Route exact path="/mypage" component={adminPage} />
                <Route  component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;