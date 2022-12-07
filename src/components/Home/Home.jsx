import React, { useEffect, useState } from "react";
import { getAllTask } from "../../api/api";
import Card from "./integrate/Card";
const Home = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [task, setTask] = useState("");
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    getAllTask(setAllTasks);
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <div className="py-5 bg-black text-white flex justify-between px-5 items-center">
        <div className="text-3xl">welcome</div>
        <div>{currentUser}</div>
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <form onSubmit={submitTask} className="w-1/2 m-auto">
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <textarea
              className="px-2 border-2 border-gray-400 rounded-md w-full py-1"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Add Task</button>
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
