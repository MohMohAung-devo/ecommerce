import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useAllUser } from "@/api/userList/query";
import classes from "./Dashboard.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Dashboard = () => {
  const { data, isError } = useAllUser();

  const dataGraph = [
    { name: "January", registerUser: 4000, Product: 2400, amt: 2400 },
    { name: "February", registerUser: 3000, Product: 1398, amt: 2210 },
    { name: "March", registerUser: 2000, Product: 9800, amt: 2290 },
    { name: "April", registerUser: 2780, Product: 3908, amt: 2000 },
    { name: "May", registerUser: 1890, Product: 4800, amt: 2181 },
    { name: "June", registerUser: 2390, Product: 3800, amt: 2500 },
    { name: "July", registerUser: 3490, Product: 4300, amt: 2100 },
  ];

  const pieChart = [
    {
      title: "Active",
      value: data?.filter((user) => user.isActive).length,
      color: "red",
    },
    {
      title: "inActive",
      value: data?.filter((user) => !user.isActive).length,
      color: "green",
    },
  ];
  return (
    <div className={classes.UserListContainer}>
      <div className={classes.UserList}>
        <h1 className={classes.headingText}>Dashboard</h1>
        <div className={classes.pieChart}>
          <div className={classes.userPie}>
            <PieChart
              data={[
                { title: "Active User", value: 10, color: "#FFFFFF" },
                { title: "All User", value: 15, color: "#34a1eb" },
              ]}
              label={(data) => data.dataEntry.title}
              labelPosition={50}
              lengthAngle={360}
              style={{ fontSize: "4px", width: "350px", height: "350px" }}
            />
            <h1 className={classes.userListText}>User </h1>
          </div>
          <div className={classes.userPie}>
            <PieChart
              data={[
                { title: "Product", value: 40, color: "#FFFFFF" },
                { title: "Sell Product ", value: 15, color: "#34a1eb" },
              ]}
              label={(data) => data.dataEntry.title}
              labelPosition={50}
              lengthAngle={360}
              style={{ fontSize: "4px", width: "350px", height: "350px" }}
            />
            <h1 className={classes.userListText}>Sell Product </h1>
          </div>
          <div className={classes.userPie}>
            <PieChart
              data={[
                { title: "Buy Product User ", value: 10, color: "#FFFFFF" },
                { title: "All User", value: 30, color: "#34a1eb" },
              ]}
              label={(data) => data.dataEntry.title}
              labelPosition={50}
              lengthAngle={360}
              style={{ fontSize: "4px", width: "350px", height: "350px" }}
            />
            <h1 className={classes.userListText}>Buy Product User</h1>
          </div>
        </div>
        <div className={classes.userBarChart}>
          <div className={classes.userBar}>
            <BarChart
              width={1300}
              height={400}
              data={dataGraph}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registerUser" fill="#FFFFFF" />
              <Bar dataKey="Product" fill="#34a1eb" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
