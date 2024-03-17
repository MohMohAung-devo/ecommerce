import React, { ReactNode } from "react";
import Navbar from "@/pages/navbar/Navbar";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <div className={classes.Nav}>
          <Navbar />
        </div>
        <div className={classes.container}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
