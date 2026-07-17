import Todo from "./Todo.jsx";
import { useEffect, useState } from "react";
import { getTodo, addTodo, updateTodo } from "../api/todos.js";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Update Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  async function get_todos() {
    setLoading(true);

    try {
      const data = await getTodo();
      setTodos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function add_todo() {
    try {
      if (!input.trim()) return;

      await addTodo(input);

      setInput("");
      get_todos();
    } catch (err) {
      console.log(err);
    }
  }

  function openUpdateModal(todo) {
    if (todo[2]) return;
    setSelectedTodo(todo);
    setUpdatedText(todo[1]);
    setShowModal(true);
  }

  async function update_todo() {
    try {
      if (!updatedText.trim()) return;

      await updateTodo({
        id: selectedTodo[0],
        todo: updatedText,
      });

      closeModal();

      get_todos();
    } catch (err) {
      console.log(err);
    }
  }

  function closeModal() {
    setShowModal(false);
    setSelectedTodo(null);
    setUpdatedText("");
  }

  useEffect(() => {
    get_todos();
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 h-fit">
        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your todo..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={add_todo}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {loading ? (
            <h2 className="text-center text-lg">Loading...</h2>
          ) : todos.length === 0 ? (
            <h2 className="text-center text-lg text-gray-500">
              No Todo added...
            </h2>
          ) : (
            todos.map((todo) => (
              <Todo
                key={todo[0]}
                props={todo}
                get_todos={get_todos}
                openUpdateModal={openUpdateModal}
              />
            ))
          )}
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[400px] rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Update Todo</h2>

            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeModal}
                className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={update_todo}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todos;
