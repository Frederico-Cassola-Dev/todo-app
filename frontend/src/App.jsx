// import axios from "axios";
// import { useEffect, useState } from "react";

function App() {
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
  //     .then((response) => setTasks(response.data))
  //     .catch((err) => console.error(err));
  // }, []);
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
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Insert your task... and press enter"
              className="w-6/12 p-1 rounded-md border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-black"
            />
          </div>
        </div>
        <div className="flex justify-center gap-16">
          <div className="">
            <h2 className=" text-gray-400 text-xl m-4">Tasks</h2>
            <ul>
              <li className="text-center">task 1</li>
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4">Priority</h2>
            <ul>
              <li className="text-center">true</li>
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4">Importance</h2>
            <ul>
              <li className="text-center">A</li>
            </ul>
          </div>
          <div>
            <h2 className=" text-gray-400 text-xl m-4">Operations</h2>
            <ul className="flex gap-4">
              <li>
                <button type="button">Mofify</button>
              </li>
              <li className="text-center">
                <button type="button">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
