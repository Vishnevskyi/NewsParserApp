import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"

const AddForm = () => {
    const options = [
        { label: "Новина", value: "correspondence" },
        { label: "Стаття", value: "articles" },
        { label: "Завдання", value: "aside" },
    ]
    const [option, setOption] = useState(options[0].value)
    const { register, handleSubmit, control } = useForm();
    const [result, setResult] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [href, setHref] = useState("");
    const onSubmit = (data) => {
        if (option === "aside") {
            if (title.length === 0) {
                setResult({ message: "Заповніть поля" });
            }
            else {
                setTitle('');
                setContent('');
                setHref('');
                setOption([]);
            }
        }
        else if (option === "correspondence" || option === "articles") {
            if (content.length === 0 || title.length === 0) {
                setResult({ message: "Заповніть поля" });
            }
            else {
                setTitle('');
                setContent('');
                setHref('');
                setOption([]);
            }
        }
        else if (option === 'undefined') {
            setResult({ message: "Виберіть вид публікації" });
        }
        else {
            setTitle('');
            setContent('');
            setHref('');
            setOption([]);
        }
        let formData = new FormData();
        for (let key in data) {
            if (key === "picture") {
                formData.append(key, data.picture[0]);
            }
            else {
                formData.append(key, data[key]);
            }
        }
        //--------------------------------
        //Отправка формы в бд на выборку
        fetch("https://murmuring-forest-06470.com/api/addNews", {
            method: "POST",
            mode: "cors",
            body: formData,
        })
            .then(async (res) => {
                return await res.json(res);
            })
            .then(async (res) => {
                return await setResult(res);
            })
            .catch(async (err) => {
                return await setResult(err)
            }, []);
    }
    const onErr = (err) => {
        console.log(err);
    }
    return (
        <div>
            {result.message}
            <form onSubmit={handleSubmit(onSubmit, onErr)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="title"
                    label="Заголовок"
                    type="text"
                    id="title"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    inputRef={register}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="href"
                    label="Посилання"
                    type="text"
                    id="href"
                    onChange={e => setHref(e.target.value)}
                    value={href}
                    inputRef={register}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="content"
                    label="Контент"
                    type="text"
                    id="content"
                    multiline
                    rows={4}
                    onChange={e => setContent(e.target.value)}
                    value={content}
                    inputRef={register}
                />
                <div style={{ marginBottom: "2em" }}>
                    <FormControl>
                        <InputLabel>
                            Вибір публікації
                        </InputLabel>
                        <Controller
                            as={
                                <Select style={{ width: "200px" }} value={option} onChange={e => setOption(e.target.value)}>
                                    {options.map((res) => (
                                        <MenuItem key={res.value} value={res.value}>{res.label}</MenuItem>
                                    ))}
                                </Select>
                            }
                            name="option"
                            id="option"
                            control={control}
                        />
                    </FormControl>
                    <div style={{ marginTop: "2em" }}>
                        <input type="file" name="picture" ref={register} style={{ border: "1px solid blue", color: "blue" }} />
                    </div>
                </div>
                <Button type="submit" variant="outlined" color="primary">Добавити</Button>
            </form>
        </div>
    )
}
export default AddForm
