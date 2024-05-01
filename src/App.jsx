import { useEffect, useState } from "react";
import CreateTask from "./Components/Createtask/CreateTask";
import ListTask from "./Components/Createtask/ListTasks";
import Navbar from "./Components/Navbar/Navbar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [tasks, setTasks] = useState([]);

  console.log(tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <>
      <Navbar />
      <Toaster />
      <DndProvider backend={HTML5Backend}>
        <div className="w-[100%] bg-slate-200 h-screen flex flex-col items-center pt-3">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>
  );
};

export default App;
