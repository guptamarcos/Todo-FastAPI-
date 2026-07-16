import axiosInstance from "./axiosInstance.js";

export const getTodo = async () => {
  const response = await axiosInstance.get("/todos");
  return response?.data;
};

export async function addTodo(data) {
  const response = await axiosInstance.post("/todos", { title: data });
  console.log(response);
  return response?.data;
}

export async function updateTodo(props) {
  console.log(props)
  const response = await axiosInstance.put("/todos", {props});
  console.log(response);
  return response?.data;
}

export async function deleteTodo(id) {
    const response = await axiosInstance.delete("/todos", { id })
    console.log(response);
    return response?.data;
}
