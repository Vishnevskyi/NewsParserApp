const db = require("../database/database");
const cheerio = require("cheerio");
let CronJob = require("cron").CronJob;
let axios = require("axios");
let getData = (html) => {
    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        year: 'numeric'
    };
    const $ = cheerio.load(html);
    let blocks = $(".hot-news-container");
    blocks.each(async(i, val) => {
        if (new Date().toLocaleString("ukr", options).replace('р.', '').replace(/,/g, '').toLowerCase().trim() === $(val).find('p').text().replace(/,/g, '').toLowerCase().trim()) {
            if ($(val).find('.img-container').find('img').attr('src') === undefined || $(val).find('.img-container').find('a').attr('href') === undefined || $(val).find('.text-container').find('h3').text() === '') {

            }
            else {
                let content = await getContent($(val).find('.img-container').find('a').attr('href'));
                db.connection.query(`INSERT INTO correspondence (title,date,href,image,content) VALUES ('${$(val).find('.text-container').find('h3').text()}','${new Date().toISOString().slice(0, 10)}','${$(val).find('.img-container').find('a').attr('href')}','${$(val).find('.img-container').find('img').attr('src')}','${content.trim()}')`, (err, res) => {
                    if (err) console.log("Така новина вже є, або помилка БД");
                    else {
                        console.log("Новину було добавлено");
                    }
                })
            }
        }
    })
}
let getContent = async (url) => {
    return new Promise((resolve,reject)=>{
        axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data);
            let content = $('.news-text').text();
            resolve(content);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
    }
let start = () =>{
    axios.get("https://volynonline.com/")
    .then(res => {
        getData(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}
let getDataArticle = async(html) => {
    const $ = cheerio.load(html);
    let blocks = $("article");
    blocks.each(async (i, val) => {
        let content = await getArticleContent(($(val).find('h3').find('a').attr("href")));
        db.connection.query(`SELECT * FROM articles WHERE title = '${$(val).find('h3').text()}'`,(err,result)=>{
            if (err)
            {
                console.log("Помилка");
            }
            else if (result.length > 0)
            {
                console.log("Така стаття вже є");
            }
            else
            {
                db.connection.query(`INSERT INTO articles (title,date,href,image,content,author) VALUES ('${$(val).find('h3').text().replace(/`/g,'').replace(/"/g,'').replace(/'/g,"")}','${new Date().toISOString().slice(0, 10)}','${$(val).find('h3').find('a').attr("href")}','${$(val).find('.avatar-img').find('img').attr('src')}','${content.trim().replace(/`/g,'').replace(/"/g,'').replace(/'/g,'')}','${$(val).find('.author').find('a').text()}')`, (err, res) => {
                    if (err) console.log(err);
                    else {
                        console.log("Статтю було добавлено");
                    }
                })
            }
        })
    })
}
let getArticleContent = async (url) => {
return new Promise((resolve,reject)=>{
    axios.get(url)
    .then(res => {
        const $ = cheerio.load(res.data);
        let content = $('.text').text();
        resolve(content);
    })
    .catch(err => {
        console.log(err);
        reject(err);
    })
})
}
let getArticle = async() => {
    axios.get("https://censor.net/ua/blogs/all")
        .then(res => {
            getDataArticle(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}
let job = new CronJob('* * * * *', async() => {
    await start();
    await getArticle();
}, null, true, 'America/Los_Angeles');
module.exports = {
    job
}