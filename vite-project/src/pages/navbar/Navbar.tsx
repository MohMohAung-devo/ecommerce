import React, { useEffect, useId, useState } from "react";
import classes from "./Navbar.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/pages/hook/useAuth";

const Navbar = () => {
  const { isAuthenicated, user, logout } = useAuth();

  // useEffect(() => {
  //   if (isAuthenicated && user) {
  //     setName(user.name);
  //   }
  // }, [user, isAuthenicated]);

  console.log(user);
  return (
    <div className={classes.Container}>
      <div className={classes.navContainer}>
        <p>Home</p>
        {isAuthenicated ? (
          <div className={classes.item}>
            <div>{user?.name}</div>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className={classes.item}>
            <Link to="/register">
              <Button style={{ fontSize: "18px" }}>Register</Button>
            </Link>
            <Link to="/login">
              <Button style={{ fontSize: "18px" }}>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
