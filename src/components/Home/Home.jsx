import React, { useEffect, useState } from "react";
import { getAllTask } from "../../api/api";
import Card from "./integrate/Card";
const Home = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [task, setTask] = useState("");
  useEffect(() => {
    getAllTask(setAllTasks);
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form onSubmit={submitTask}>
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        {allTasks?.map((task, index) => (
          <Card {...task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
