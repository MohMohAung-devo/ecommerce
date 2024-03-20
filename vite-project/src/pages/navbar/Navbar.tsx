import React from "react";
import classes from "./Navbar.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.navContainer}>
        <p>Home</p>
        <div className={classes.item}>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>

          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
