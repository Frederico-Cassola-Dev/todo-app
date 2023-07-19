import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    is_urgent: false,
    importance_id: "",
  });

  const update = (event) => {
    const target = event.currentTarget;

    setNewTask({
      ...newTask,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, newTask)
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, [submit]);
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
          <form className="flex justify-center gap-6">
            <label htmlFor="title">
              <input
                type="text"
                name="title"
                placeholder="Insert your task... and press enter"
                onChange={update}
                className="w-96 p-1 rounded-md border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-black cursor-pointer"
              />
            </label>
            <label htmlFor="" className=" flex gap-2">
              <span className=" text-xl">Is Urgent </span>
              <input
                type="checkbox"
                name="is_urgent"
                id=""
                onChange={update}
                className="h-8 w-8 rounded-full cursor-pointer"
              />
            </label>
            <label htmlFor="importance_id">
              <select
                name="importance_id"
                id="importance_id"
                onChange={update}
                className="p-1 rounded-md text-slate-400 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 cursor-pointer"
              >
                <option disabled value="">
                  Select importance
                </option>
                <option value="1">Very important</option>
                <option value="2">Important</option>
                <option value="3">Not important</option>
                <option value="4">Not important at all</option>
              </select>
            </label>
            <button type="submit" onClick={submit}>
              Submit
            </button>
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
