import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.headingContainer}>
        <div className={classes.FooterContainer}>
          <div className={classes.ContactContainer}>
            <h1 className="text-2xl mb-5">Contact</h1>
            <p>Email: mohmohaung737@gmail.com</p>
            <p>Phone: 09259575377</p>
            <p>@All Right Reserved</p>
          </div>

          {/* <div className={classes.textContainer}>
            <p>Any other question contact me free or contact Live Chat </p>
          </div> */}

          {/* <div className={classes.liveContainer}>
            <p>Live Chat</p>
          </div> */}
        </div>
       
      </div>
    </div>
  );
};

export default Footer;
