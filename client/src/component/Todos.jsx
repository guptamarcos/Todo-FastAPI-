import { getTodos } from "../api/todos.jsx";

function Todos() {
  
  async function getData(){
    const data = await getTodos();
    console.log(data);
  }

  getData();
  
  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 h-fit">
        {/* Input and Add Button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your todo..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
            <p className="text-gray-800">Learn React</p>

            <div className="flex gap-2">
              <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition">
                Update
              </button>

              <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;