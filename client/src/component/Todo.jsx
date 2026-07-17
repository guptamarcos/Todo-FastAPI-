import {updateTodo, deleteTodo } from "../api/todos.js";

function Todo({ props, get_todos, openUpdateModal }) {
  async function delete_todo(id) {
    try {
      await deleteTodo(id);
      get_todos();
    } catch (err) {
      console.log(err);
    }
  }

  async function toggle_complete() {
    console.log(props[2]);
    try {
      await updateTodo({ id: props[0], completed: !props[2] });
      get_todos();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <input
          type="radio"
          defaultChecked={props[2]}
          onClick={toggle_complete}
          className="w-5 h-5 cursor-pointer accent-green-600"
        />

        <p
          className={`text-lg ${
            props[2] ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {props[1]}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex gap-2">
        <button
          onClick={() => openUpdateModal(props)}
          className={`cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition ${props[2] ? "opacity-50" : ""}`}
        >
          Update
        </button>

        <button
          onClick={() => delete_todo(props[0])}
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;