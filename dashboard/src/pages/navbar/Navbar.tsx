import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
export const Navbar = () => {
  const [active, setActive] = useState(false);
  const menu = [
    { name: "Dashboard", link: "" },
    { name: "Product Add", link: "/product-add" },
    {
      name: "User List",
      link: "/user-list",
    },
    {
      name: "Buy Product",
      link: "/buy-product",
    },
    {
      name: "Buy User List",
      link: "/buy-user-list",
    },
  ];

  const handleActive = () => {
    setActive(!active);
  };
  return (
    <div className={classes.NavContainer}>
      <div className={classes.Container}>
        {menu.map((item) => (
          <Link
            key={item.name}
            className={` ${classes.Item} ${
              location.pathname === item.link ? classes.active : ""
            }`}
            to={item.link}
            onClick={handleActive}
          >
            <p className={classes.Link}>{item.name}</p>
            <FaAngleRight className={classes.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Navbar;
