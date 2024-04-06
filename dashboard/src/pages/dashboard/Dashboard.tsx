import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useAllUser } from "@/api/userList/query";
import classes from "./Dashboard.module.css";
import { LineChart, CartesianGrid, Line, Tooltip, XAxis } from "recharts";
const Dashboard = () => {
  const { data, isError } = useAllUser();

  const pieChart = [
    {
      title: "Acitve",
      value: data?.filter((user) => user.isActive).length || 0,
      color: "red",
    },
    {
      title: "inAcitve",
      value: data?.filter((user) => !user.isActive).length || 0,
      color: "green",
    },
  ];
  return (
    <div className={classes.UserListContainer}>
      <div className={classes.UserList}>
        <h1>Dashboard</h1>
        <div className={classes.pieChart}>
          <div>
            <PieChart data={pieChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
