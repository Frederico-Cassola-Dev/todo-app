import { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [showModify, setShowModify] = useState({
    taskId: "",
    showTheModifyForm: false,
  });

  const [newTask, setNewTask] = useState({
    title: "",
    is_urgent: "",
    importance_id: "",
  });

  const refreshList = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${showModify.taskId}`)
      .then((response) => setSelectedTask(response.data))
      .catch((err) => console.error(err));
  }, [showModify]);

  const update = (event) => {
    const target = event.currentTarget;

    setNewTask({
      ...newTask,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    if (newTask.title !== "" && newTask.importance_id !== "") {
      if (newTask.is_urgent === "") {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            title: newTask.title,
            is_urgent: 0,
            importance_id: newTask.importance_id,
          })
          .then(() => refreshList())
          .then(() =>
            setNewTask({
              title: "",
              is_urgent: "",
              importance_id: "",
            })
          )
          .catch((err) => console.error(err));
      } else {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, newTask)
          .then(() => refreshList())
          .then(() =>
            setNewTask({
              title: "",
              is_urgent: "",
              importance_id: "",
            })
          )
          .catch((err) => console.error(err));
      }
    }
  };
  const submitModify = (event) => {
    event.preventDefault();

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${showModify.taskId}`, {
        title: newTask.title !== "" ? newTask.title : selectedTask.title,
        is_urgent:
          newTask.is_urgent === "" ? selectedTask.is_urgent : newTask.is_urgent,
        importance_id:
          newTask.importance_id !== ""
            ? newTask.importance_id
            : selectedTask.importance_id,
      })
      .then(() =>
        setShowModify({
          taskId: "",
          showTheModifyForm: false,
        })
      )
      .then(() => refreshList())
      .then(() =>
        setNewTask({
          title: "",
          is_urgent: "",
          importance_id: "",
        })
      )
      .catch((err) => console.error(err));
  };

  const modifyTask = (taskId) => {
    setShowModify({ taskId, showTheModifyForm: true });
  };

  const removeTask = (taskId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, newTask)
      .then(() => refreshList())
      .catch((err) => console.error(err));
  };

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

          {showModify.showTheModifyForm ? (
            <form className="flex justify-center gap-6">
              <label htmlFor="title">
                <input
                  type="text"
                  name="title"
                  placeholder="Modify your task... and press modify"
                  onChange={update}
                  className="w-96 p-1 rounded-md border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-black cursor-pointer"
                />
              </label>
              <label htmlFor="" className=" flex gap-2">
                <span className=" text-xl">Is Urgent </span>
                <input
                  type="checkbox"
                  name="is_urgent"
                  checked={selectedTask.is_urgent}
                  onChange={update}
                  onClick={() =>
                    setSelectedTask((previousState) => ({
                      ...previousState,
                      is_urgent: !selectedTask.is_urgent,
                    }))
                  }
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
              <button type="submit" onClick={submitModify}>
                Modify
              </button>
            </form>
          ) : (
            <form className="flex justify-center gap-6">
              <label htmlFor="title">
                <input
                  type="text"
                  name="title"
                  placeholder="Insert your task... and press add"
                  value={newTask.title}
                  onChange={update}
                  required
                  className="w-96 p-1 rounded-md border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-black cursor-pointer"
                />
              </label>
              <label htmlFor="" className=" flex gap-2">
                <span className=" text-xl">Is Urgent </span>
                <input
                  type="checkbox"
                  name="is_urgent"
                  checked={newTask.is_urgent}
                  onChange={update}
                  required
                  className="h-8 w-8 rounded-full cursor-pointer"
                />
              </label>
              <label htmlFor="importance_id">
                <select
                  name="importance_id"
                  id="importance_id"
                  value={newTask.importance_id}
                  onChange={update}
                  required
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
                Add
              </button>
            </form>
          )}
        </div>
        <div className="flex justify-center gap-16">
          <div className="">
            <h2 className=" text-gray-400 text-xl m-4 text-center">Tasks</h2>
            <ul>
              {tasks &&
                tasks
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((task) => (
                    <li
                      key={task.id}
                      className={
                        showModify.taskId === task.id
                          ? "text-center px-2 border-2 rounded border-slate-500"
                          : "text-center px-2"
                      }
                    >
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
                    {task.importance_title}
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
                    <button type="button" onClick={() => modifyTask(task.id)}>
                      Modify
                    </button>
                    <button type="button" onClick={() => removeTask(task.id)}>
                      Delete
                    </button>
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
