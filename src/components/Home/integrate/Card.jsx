import React from "react";

const Card = ({ title, description, status }) => {
  return (
    <div className="border-2">
      <div className="text-3xl">{title}</div>
      <div>{description}</div>
      <div className="bg-red-500 inline text-white px-2 rounded-md">
        {status}
      </div>
    </div>
  );
};

export default Card;
