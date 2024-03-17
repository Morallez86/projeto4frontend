import React from 'react';
import { MdPriorityHigh } from "react-icons/md";
import { taskStore } from "../../stores/TaskStore";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function TaskComponent({ id, title, priority }) {
  const updateTaskId = taskStore((state) => state.updateTaskId);
  const navigate = useNavigate(); // Get the navigate function

  let bgColor;
  switch (priority) {
    case 100:
      bgColor = "bg-green-500";
      break;
    case 200:
      bgColor = "bg-yellow-500";
      break;
    case 300:
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-200";
      break;
  }

  // Function to handle task click
  const handleClick = () => {
    // Store the task ID using Zustand
    updateTaskId(id);
    // Navigate to the EditTask component
    navigate('/EditTask'); // Replace '/editTask' with the actual path to the EditTask component
  };

  return (
    <div className="bg-gray-200 rounded-md p-4 mb-4 text-black" onClick={handleClick}>
      <div className="flex items-center">
        <MdPriorityHigh className={`text-2xl mr-2 rounded-full ${bgColor}`} />
        <p className="text-lg font-bold">{title}</p>
      </div>
    </div>
  );
}

export default TaskComponent;