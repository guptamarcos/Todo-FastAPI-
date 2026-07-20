import axiosInstance from "./axiosInstance.js";

export const getTodo = async () => {
  const response = await axiosInstance.get("/todos");
  return response?.data;
};

export async function addTodo(data) {
  const response = await axiosInstance.post("/todos", { title: data });

  return response?.data;
}

export async function updateTodo({ id, todo, completed }) {
  const response = await axiosInstance.patch(`/todos/${id}`, {
    title: todo,
    completed,
  });
  return response?.data;
}

export async function deleteTodo(id) {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response?.data;
}
