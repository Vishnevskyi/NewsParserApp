import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"

const UpdateForm = () => {
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
    const [id,setId] = useState('');
    const onSubmit = (data) => {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        if (content.length === 0 && title.length === 0) {

        }
        else {
            setTitle('');
            setContent('');
            setId('');
            setOption();
        }
        //--------------------------------
        //Отправка формы в бд на выборку
        fetch("http://localhost:4000/api/uppdate", {
            method: "POST",
            mode: "cors",
            body: formData,
        })
            .then(async (res) => {
                return await res.json();
            })
            .then(async (res) => {
                setResult(res);
            })
            .catch((err) => {
                console.log(err);
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
                    name="id"
                    label="Номер"
                    type="text"
                    id="id"
                    onChange={e => setId(e.target.value)}
                    value={id}
                    inputRef={register}
                />
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
                </div>
                {/* <input
                    type="file"
                    name="picture"
                    ref={register}
                    style={{width: "100%", marginBottom: "1em"}}
                /> */}
                <Button type="submit" variant="outlined" color="primary">Добавити</Button>
            </form>
        </div>
    )
}
export default UpdateForm
