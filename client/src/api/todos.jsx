import axios from "axios";


export async function getTodos(){
    const response = await axios.get("http://localhost:8000/api/todos");
    return response?.data;
}
