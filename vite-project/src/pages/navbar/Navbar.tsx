import React from "react";
import classes from "./Navbar.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Profile from "@/pages/auth/profile/Profile";
import { useAuth } from "@/pages/hook/useAuth";

const Navbar = () => {
  const { isAuthenicated } = useAuth();
  return (
    <div className={classes.Container}>
      <div className={classes.navContainer}>
        <p>Home</p>
        {isAuthenicated ? (
          <div className={classes.item}>
            <Profile />
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
