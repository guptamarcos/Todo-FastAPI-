import { useEffect, useState } from "react";
import { getTodo , addTodo, updateTodo,deleteTodo} from "../api/todos.js";


function Todo({ props }) {
  async function update_todo(){
    try{
      const res = await updateTodo({props});
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }
  
  async function delete_todo(id){
    console.log(id)
    try{
      const response = await delete_todo(id);
      console.log(response);
    }catch(err){
      console.log(err);
    }
  }
  console.log(props[0])

  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
      <p className="text-gray-800">{props[1]}</p>

      <div className="flex gap-2">
        <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition">
          Update
        </button>

        <button onClick={() => delete_todo(props[0])} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
          Delete
        </button>
      </div>
    </div>
  );
}

function Todos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  async function get_todos() {
    try{
      const data = await getTodo();
      setTodos(data);
    }catch(err){
      console.log(err);
    }
  }

  async function add_todo(){
    try{
      await addTodo(input)
      setInput("");
      get_todos();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    get_todos();
  }, []);
  
  // console.log(input);

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 h-fit">
        {/* Input and Add Button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your todo..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={add_todo} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos?.map((val) => {
            return <Todo props={val} key={val[0]}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Todos;
