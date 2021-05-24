const db = require("../database/database");
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/authConfig")
const bcrypt = require("bcrypt");
exports.testCookie = (req, res) => {
    jwt.verify(req.cookies.auth, Object.values(jwtSecret)[0], (err, decode) => {
        res.set("Access-Control-Allow-Origin", req.headers.origin); //<<КОСТЫЛЬ!? << ООооХ, эти 2 строки что бы можно было отправлять статус коды.
        res.set("Access-Control-Allow-Credentials", "true");        //<<КОСТЫЛЬ!? << Без них  CORS начитает ругатся, хотя он и без этого рукается.
        if (err || typeof decode === "undefined") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let { id, role } = jwt.decode(req.cookies.auth);
        console.log(id, role);
        return res.status(200).json({ id, role });
    });
};
//Вход на сайт
exports.login = (req, res) => {
    const { login, password } = req.body;
    const role = 'admin';
    if (!login || !password) return res.status(401).json(`${new Error("Невірний  логін або пароль")}`);

    db.connection.query(`SELECT * FROM ${role} WHERE login = '${login}'`, (err, result) => {
        if (err) return res.status(401).json(
            `${new Error("Невірний  логін або пароль")}`
        );

        let id = result === undefined ? () => {
            return res.status(401).json(`${new Error("Невірний  логін або пароль")}`);
        } : typeof result[0].id === "undefined" ? "0" : result[0].id;

        if (result.length === 0) {
            res.status(401).json(
                `${new Error("Невірний  логін або пароль")}`
            );
        } else {
            const hash = (password === result[0].password); // Сравниваем пароли
            if (hash) {
                jwt.sign(
                    {
                        name: result[0].name,
                        role: role,
                        id: id
                    },
                    Object.values(jwtSecret)[0],
                    {
                        expiresIn: 60 * 2,
                    },
                    (err, token) => {
                        if (err) throw new Error(err);
                        res.cookie("auth", `${token}`, { httpOnly: true });
                        res.redirect("http://localhost:3000/");// БЕЗ ЭТОГО КУКА НЕ ОТПРАВЛЯЕТСЯ
                    });

            } else {
                return res.status(401).json(
                    `${new Error("Невірний  логін або пароль")}`
                );
            }


        }
    });
};
//Exit
exports.logOut = (req, res) => {
    const token = jwt.sign({}, jwtSecret, {
        expiresIn: 0,
    });
    res.cookie("auth", `${token}`);
    res.redirect("http://localhost:3000/");
    res.status(401);
}
//getMainNews
exports.getNews = (req, res) => {
    let sql = "SELECT * FROM correspondence ORDER BY id DESC";
    db.connection.query(sql, (error, result) => {
        if (error) res.status(500).json({
            message: "Помилка"
        })
        else {
            res.send(result);
        }
    })
}
//getLaterNews
exports.getLater = (req,res)=>{
    db.connection.query("SELECT * FROM correspondence WHERE date <= NOW() - INTERVAL 1 DAY ORDER BY date DESC",(err,result)=>{
        if (err) res.status(500).json({
            message: "Помилка"
        })
        else
        {
            res.send(result);
        }
    })
}
//Articles
exports.getArticles = (req, res) => {
    let sql = "SELECT * FROM articles ORDER BY date DESC";
    db.connection.query(sql, (err, result) => {
        if (err) res.status(500).json({
            message: "Помилка"
        })
        else {
            res.send(result);
        }
    })
}
//Aside
exports.getAside = (req, res) => {
    let sql = "SELECT * FROM aside ORDER BY id DESC";
    db.connection.query(sql, (err, result) => {
        if (err) res.status(500).json({
            message: "Помилка"
        })
        else {
            res.send(result);
        }
    })
}
//AddNews
exports.insertNews = (req, res) => {
    let { title, content, href, option } = req.body;
    const today = new Date().toISOString().slice(0, 10);
    if (title === '' || content === '' || option === 'undefined' || req.file.path === 'undefined') {
        if (option === 'aside') {
            db.connection.query(`SELECT * FROM ${option} WHERE title = '${title}'`, (error, result_select) => {
                if (result_select.length > 0) {
                    res.status(500).json({
                        message: `${option} з таким заголовком вже існує`
                    })
                }
                else {
                    db.connection.query(`INSERT INTO ${option} (title,date) VALUES ('${title}','${today}')`, (err, result) => {
                        if (err) res.status(500).json({
                            message: "Помилка"
                        })
                        else {
                            res.status(200).json({
                                message: `${option} добавлено`
                            })
                        }
                    })
                }
            })
        }
        else {
            res.status(500).json({
                message: "Ви не заповнили усі поля"
            })
        }
    }
    else {
        content = content.replace(/'/g, '');
        let path = req.file.path;
        path = path.substr(11, path.length);
        db.connection.query(`SELECT * FROM ${option} WHERE title = '${title}'`, (error, result_select) => {
            if (result_select.length > 0) {
                res.status(500).json({
                    message: `${option} з таким заголовком вже існує`
                })
            }
            else {
                db.connection.query(`INSERT INTO ${option} (title,content,date,href,image) VALUES ('${title}','${content}','${today}','${href}','${path}')`, (err, result) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).json({
                            message: `${option} добавлено`
                        })
                    }
                })
            }
        })
    }
}
//DeleteNews
exports.deleteNews = (req, res) => {
    const { date, title, option } = req.body;
    if (date === '' || title === '') {
        res.status(500).json({
            message: "Ви не заповнили усі поля"
        })
    }
    else {
        db.connection.query(`SELECT * FROM ${option} WHERE title = '${title}' AND date = '${date}'`, async (err_sel, res_sel) => {
            if (err_sel) await res.status(500).json({
                message: "Помилка"
            })
            if (res_sel.length === 0) await res.status(500).json({
                message: `Такої ${option}, в дану дату не існує`
            })
            else {
                db.connection.query(`DELETE FROM ${option} WHERE title = '${title}' AND date = '${date}'`, async (err, result) => {
                    if (err) await res.status(500).json({
                        message: "Помилка"
                    })
                    await res.status(200).json({
                        message: "Успішно"
                    })
                })
            }
        })
    }
}
//Select In MainPage
exports.select = (req, res) => {
    const select = req.body.select;
    db.connection.query(`SELECT * FROM correspondence WHERE title = '${select}' OR content = '${select}'`, (err, result) => {
        if (err) res.status(500).json({
            message: "Помилка"
        })
        else {
            res.status(200).send(result);
        }
    })
}
//Update In AdminPage
exports.update = (req, res) => {
    const { id, title, content, option } = req.body;
    if (id === '' || option === 'undefined') {
        res.status(500).json({
            message: "Ви не заповнили усі поля"
        })
    }
    else {
        if (title === '') {
            db.connection.query(`UPDATE ${option} SET content = '${content}' WHERE id = '${id}'`, (err, result) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({
                        message: "Новину ононвлено"
                    })
                }
            })
        }
        else if (content === '') {
            db.connection.query(`UPDATE ${option} SET title = '${title}' WHERE id = '${id}'`, (err, result) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({
                        message: "Новину оновлено"
                    })
                }
            })
        }
        else {
            db.connection.query(`UPDATE ${option} SET content = '${content}',title = '${title}' WHERE id = '${id}'`, (err, result) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({
                        message: "Новину оновлено"
                    })
                }
            })
        }
    }
}