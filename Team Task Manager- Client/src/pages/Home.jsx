import React from "react";
import { useGetAllTasksQuery } from "../features/applicationApi";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((s) => s.auth.user);
  const { data, isLoading: isLoadingTasks } = useGetAllTasksQuery();

  // const dispatch = useDispatch();
    // const res = getAllTasks();
    const navigate = useNavigate();
    if (isLoadingTasks) return <Loading />;
    if (!user) {
        navigate("/login");
    }
  return (
    <div className="mx-auto max-w-3xl">
      <h2>Tasks</h2>
      {(user.role == "Manager" || user.role == "Admin") && <CreateTask />}
      <table className=" border-2">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>dueDate</th>
            <th>AssignedTo</th>
            <th>CreatedBy</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task) => {
            <tr className="  border-b-2" key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.assignedTo?.name}</td>
              <td>{task.createdBy?.name}</td>
              <td>delete, edit</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
