import React, { useState } from "react";
import classes from "./Home.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";
import { Button } from "@/components/ui/button";
export const Home = () => {
  const [next, setNext] = useState(0);
  const item = [Photo, Photo1, Photo2];

  const handleNext = () => {
    setNext((prev) => (prev + 1) % item.length);
  };

  const handlePrevious = () => {
    setNext((prev) => (prev === 0 ? item.length - 1 : prev - 1));
  };

  return (
    <div className={classes.Container}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${item[next]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className={classes.leftButton}>
        <Button onClick={handlePrevious} style={{ width: "100px" }}>
          Previous
        </Button>
      </div>
      <div className={classes.rightButton}>
        <Button
          onClick={handleNext}
          style={{ width: "100px", borderRadius: "10px" }}
        >
          Next
        </Button>
      </div>

      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Home;
