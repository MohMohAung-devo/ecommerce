import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.FooterContainer}>
        <div>
          <h1>Contact</h1>
          <p>Email: mohmohaung737@gmail.com</p>
          <p>Phone: 09259575377</p>
        </div>

        <div>
          <p>Any other question contact me free or contact Live Chat </p>
          <p>@All Right Reserved</p>
        </div>

        <div>
          <p>Live Chat</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
