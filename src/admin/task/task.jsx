const { useState, useEffect } = require("react")

const Task = () =>{
    const [task,setTask] = useState([]);
    useEffect(()=>{
        fetch("https://obscure-taiga-00490.herokuapp.com:4123/aside",{
            method: "POST",
            mode: "cors"
        }).then(res => res.json())
        .then(res => setTask(res))
        .catch(err => setTask(err))
    })
    return(
        <div>{task.map((res)=> (<div key={res.id}>#{res.id}-{res.title}<br/></div>))}</div>
    )
}
export default Task;
