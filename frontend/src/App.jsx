import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="bg-gray-900 text-white font-bold">
      <div className="flex-col  h-screen gap-40">
        <nav className="flex align-middle justify-center bg-gray-700">
          <ul className="flex gap-8 m-8">
            <li>Tasks</li>
            <li>My profil </li>
          </ul>
        </nav>
        <div className="flex-col justify-center items-center">
          <h1 className=" text-center text-4xl m-8">Todo App</h1>
          <form className="flex justify-center gap-2">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Insert your task... and press enter"
                className="w-6/12 p-1 rounded-md border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-black"
              />
            </label>
            <label htmlFor="">
              <input type="checkbox" name="isUrgent" id="" className="" />
            </label>
            <label htmlFor="">
              <select name="isUrgent" id="isUrgent">
                <option value="">Very important</option>
                <option value="">Important</option>
                <option value="">Not important at all</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="flex justify-center gap-16">
          <div className="">
            <h2 className=" text-gray-400 text-xl m-4 text-center">Tasks</h2>
            <ul>
              {tasks &&
                tasks.map((task) => (
                  <li key={task.id} className="text-center">
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4 text-center">Priority</h2>
            <ul>
              {tasks &&
                tasks.map((task) => (
                  <li key={task.id} className="text-center">
                    {task.is_urgent === 1 ? "Urgent" : "Not Urgent"}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4 text-center">
              Importance
            </h2>
            <ul>
              {tasks &&
                tasks.map((task) => (
                  <li key={task.id} className="text-center">
                    {task.importance_id}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4 text-center">
              Operations
            </h2>
            <ul className="flex-col gap-6">
              {tasks &&
                tasks.map((task) => (
                  <li key={task.id} className="flex justify-center gap-4">
                    <button type="button">Mofify</button>
                    <button type="button">Delete</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
