import { Button, TextField } from "@material-ui/core"
import {useState } from "react";
import { useForm } from "react-hook-form"

const Select = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("");
    const [select, setSelect] = useState([]);
    const onSubmit = (data) => {
        setSelect("");
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        fetch("http://localhost:4000/api/select", {
            body: formData,
            mode: "cors",
            method: "POST"
        })
            .then((res) => res.json())
            .then((res) => setMessage(res))
            .catch((err) => setMessage(err))
    }
    return (
        <div style={{marginBottom: "1em"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
                <div>
                    <TextField
                        variant="outlined"
                        color="primary"
                        name="select"
                        type="text"
                        label="Пошук"
                        placeholder="Введіть текст"
                        inputRef={register}
                        margin="normal"
                        onChange={(e) => setSelect(e.target.value)}
                        value={select}
                    />
                </div>
                {message.length === 0 ? '' : message.message === 'Пусті дані' ? <h3>0 - результатів пошуку</h3> : <div><h3>{message.length} результатів пошуку</h3>{message.map((res)=>(<a href={`/article/${res.id}`}>{res.title}<br/></a>))}</div>}
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "1em" }}>
                    Шукати
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={(e) => setMessage("")}>
                    Скинути
                    </Button>
            </form>
        </div>
    )
}
export default Select