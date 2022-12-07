import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { addTask, getAllTask } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import Card from "./integrate/Card";
const Home = () => {
  const [allTasks, setAllTasks] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    getAllTask(setAllTasks);
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
    if (task.title === "" || task.description === "") return;

    addTask(task, setTask, setAllTasks);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setTask((preTask) => {
      return {
        ...preTask,
        [name]: value,
      };
    });
  };
  return (
    <div className="">
      <div className="py-5 bg-black text-white flex justify-between px-5 items-center">
        <div className="text-3xl">welcome</div>
        <div className="flex items-center gap-x-4">
          <div>{currentUser}</div>
          <div
            onClick={() => {
              localStorage.clear();
              navigate("/login");
              dispatch({ type: "LOGOUT" });
            }}
            className="cursor-pointer"
          >
            logout
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <form onSubmit={submitTask} className="w-1/2 m-auto">
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={task.title}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="desctipiton">Description</label>
              <textarea
                className="px-2 border-2 border-gray-400 rounded-md w-full py-1"
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={task.description}
                onChange={changeHandler}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-3 rounded-md"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="flex-1">
          {allTasks?.map((task, index) => (
            <Card {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
