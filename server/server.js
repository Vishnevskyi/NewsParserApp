const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");     // для кросдоменных запросов
const cookieParser = require("cookie-parser");
// const parser = require("./middleware/parse")
const app = express();
const PORT = 4123;
app.use(cors());    //Кроссдоменные запросы
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));  //для работы с формами
app.use(cookieParser());            //для работы с куки
app.use(require("./routes/router.js"));
app.listen(PORT, () => {
    console.log(`https://obscure-taiga-00490.herokuapp.com:${PORT}`);
});
