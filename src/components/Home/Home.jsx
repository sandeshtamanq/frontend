import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { addTask, getAllTask } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import checkListImg from "../../assets/Checklist.jpg";
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

  console.log(allTasks);
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
      <div className="py-3 bg-black text-white flex justify-between px-5 items-center">
        <div className="text-3xl">Welcome, {currentUser?.firstName}</div>
        <div className="flex items-center gap-x-4">
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
      <div className="flex items-start py-10">
        <div className="w-[45%]">
          <form onSubmit={submitTask} className="w-[70%] m-auto">
            <div>
              <label htmlFor="title">Title</label>
              <input id="title" type="text" name="title" value={task.title} onChange={changeHandler} />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="px-2 border-2 border-gray-400 rounded-md w-full py-1"
                name="description"
                id="description"
                cols="30"
                rows="7"
                value={task.description}
                onChange={changeHandler}
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-5 py-3 rounded-md">
              Add Task
            </button>
          </form>
        </div>
        <div className="flex-1 px-10 h-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-400">
              <thead className="text-xs  uppercase bg-gray-900  text-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTasks?.map((task, index) => (
                  <Card {...task} setAllTasks={setAllTasks} />
                ))}
              </tbody>
            </table>
          </div>
          {allTasks.length === 0 && <img src={checkListImg} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Home;
