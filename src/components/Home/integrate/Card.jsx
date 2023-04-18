import React, { useState } from "react";
import { updateTask } from "../../../api/api";

const Card = ({ id, taskName, description, status, createdAt }) => {
  const [taskStatus, setTaskStatus] = useState(status);
  const changeHandler = (e) => {
    updateTask(id, e.target.value);
    setTaskStatus(e.target.value);
  };
  const statusColor = taskStatus === "open" ? "bg-blue-600" : taskStatus === "progress" ? "bg-yellow-600" : "bg-green-600";
  return (
    <>
      <tr className=" border-b bg-gray-50 text-gray-500 border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
          {taskName}
        </th>
        <td className="px-6 py-4">{description}</td>
        <td className={`px-6 py-4 `}>
          <div className={`text-center rounded-full text-white py-0.5 font-semibold text-sm  ${statusColor}`}>{taskStatus}</div>
        </td>
        <td className="px-6 py-4">{createdAt}</td>
        <td className="px-6 py-4">
          <form action="">
            <select value={taskStatus} className="rounded-md p-0.5" onChange={changeHandler}>
              <option name="open" value="open" id="">
                open
              </option>
              <option name="progress" value="progress">
                progress
              </option>
              <option name="done" value="done">
                done
              </option>
            </select>
          </form>
        </td>
      </tr>
    </>
  );
};

export default Card;
