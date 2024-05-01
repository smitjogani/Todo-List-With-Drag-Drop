import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo" || task.status === "");
    const fInProgress = tasks.filter((task) => task.status === "progress"|| task.status === "");
    const fClosed = tasks.filter((task) => task.status === "closed"|| task.status === "");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "progress", "closed"];

  return (
    <>
      <div className="flex mt-5 gap-16">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        ))}
      </div>
    </>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let bg = "bg-black";
  let text = "Todo";
  let tasksToMap = todos;

  if (status === "todo") {
    text = "Todo";
    bg = "bg-red-600";
    tasksToMap = todos;
  }

  if (status === "progress") {
    text = "Progress";
    bg = "bg-yellow-500";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks))
      
      return mTasks;
    });
  };

  return (
    <>
      <div className={`w-80`} ref={drop}>
        <Header text={status} bg={bg} />
        <div>
          {tasksToMap.length > 0 &&
            tasksToMap.map((task) => (
              <Task
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const Header = ({ text, bg }) => {
  return (
    <>
      <div
        className={`${bg} flex gap-[200px] items-center h-8 px-1 text-[#f5f5f5] justify-center text-[16px] uppercase rounded-[6px]`}
      >
        <h2>{text}</h2>
      </div>
    </>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(isDragging);

  return (
    <>
      <div
        ref={drag}
        className={`bg-[#f5f5f5] flex flex-col gap-5 my-2 p-2 rounded-[6px] shadow-lg ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">{task.title}</h2>
        </div>
        <p className="mt-[-18px] ">{task.desc}</p>
      </div>
    </>
  );
};
