import { useState } from "react";
import { useCreateTaskMutation, useGetAllUsersQuery } from "../features/applicationApi";
import Loading from "../components/Loading";

const CreateTask = () => {
  const defaultState = {
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  };
  const [data, setData] = useState({ ...defaultState });
  const { data: res, isLoading } = useGetAllUsersQuery();
  const [createTask, { isLoading: isTaskCreationLoading }] = useCreateTaskMutation();
  
  const handleChange = (event) => {
    setData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createTask(data).unwrap();
    setData({ ...defaultState });
    console.log(response)
  };
  if(isLoading) return <Loading />

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={data.dueDate}
          onChange={handleChange}
        />
        {/* assignedTo */}
        <select
          name="assignedTo"
          onChange={handleChange}
          value={data.assignedTo}
        >
          <option value={""} >
            Unassigned
          </option>
          {res?.users.map((user) => <option value={user._id} key={user._id}>{user.name}-{user.role}</option>)}
        </select>
        <button type="submit" disabled={isTaskCreationLoading}>{isTaskCreationLoading ? "Adding Task..." : "Add Task"}</button>
      </form>
    </div>
  );
};

export default CreateTask;
