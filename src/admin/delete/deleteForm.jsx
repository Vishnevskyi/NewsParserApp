import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"

const DeleteForm = () => {
    const options = [
        { label: "Новина", value: "correspondence" },
        { label: "Стаття", value: "articles" },
        { label: "Завдання", value: "aside" },
    ]
    const [option, setOption] = useState(options[0].value)
    const { register, handleSubmit,control } = useForm([]);
    const [result, setResult] = useState([]);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const onSubmit = (data) => {
        if (date.length === 0 && title.length === 0) {

        }
        else
        {
            setDate('');
            setTitle('');
        }
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        //--------------------------------
        //Отправка формы в бд на выборку
        fetch("https://murmuring-forest-06470.com/api/deleteNews", {
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
                <div>
                    <TextField
                        inputRef={register}
                        id="date"
                        label="Дата"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        type="date"
                        name="date"
                        onChange={e => setDate(e.nativeEvent.target.value)}
                        value={date}
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="title"
                        label="Заголовок"
                        type="text"
                        id="title"
                        inputRef={register}
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
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
                <Button
                    style={{ marginTop: "1em" }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                >
                    Видалити
                </Button>
            </form>
        </div>
    )
}
export default DeleteForm