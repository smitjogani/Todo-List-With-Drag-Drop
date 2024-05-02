import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    desc: "",
    status: "todo", //inprogree or close
  });

   localStorage.setItem(
    "tasks",
    JSON.stringify([{
      id: "4891ea9a-8069-42b5-a20a-5a9ec28cf357",
      title: "Food",
      desc: "Pizza",
      status: "closed",
    }])
  );
  
  // console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTasks((prev) => {
      const List = [...prev, task];

      localStorage.setItem("tasks",JSON.stringify(List))

      return List;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-2 flex gap-5">
        <input
          type="text"
          className="border-2 p-1 border-black rounded-[5px]"
          placeholder="Enter Title"
          value={task.title}
          required
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), title  : e.target.value })
          }
        />
        <input
          type="text"
          className="border-2 p-1 border-black rounded-[5px]"
          placeholder="Enter Description"
          value={task.desc}
          required
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), desc: e.target.value })
          }
        />
        <button className="bg-black py-1 px-4 text-[#f5f5f5] rounded-[5px] border-2 border-black cursor-pointer  hover:bg-[#f5f5f5] hover:text-black">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateTask;
