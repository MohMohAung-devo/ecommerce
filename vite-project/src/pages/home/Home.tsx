import React, { useState } from "react";
import classes from "./Home.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";
import { Button } from "@/components/ui/button";
import { useAllProduct } from "@/pages/api/server/home/query";
import { Input } from "@/components/ui/input";
export const Home = () => {
  const { data, isError } = useAllProduct();

  console.log(data);
  const [next, setNext] = useState(0);
  const item = [Photo, Photo1, Photo2];

  const dataItem = [
    { name: "Women clothes", image: Photo, price: 100 },
    { name: "Women clothes", image: Photo1, price: 100 },
    { name: "Women clothes", image: Photo2, price: 100 },
    { name: "Women clothes", image: Photo, price: 100 },
  ];

  const handleNext = () => {
    setNext((prev) => (prev + 1) % item.length);
  };

  const handlePrevious = () => {
    setNext((prev) => (prev === 0 ? item.length - 1 : prev - 1));
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Home}>
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
      </div>

      <div className={classes.ImageContainer}>
        <div className={classes.collectionList}>
          <h1 className="text-4xl">Collection</h1>
          <div className="flex justify-between justify-items-center text-center">
            <Input
              placeholder="Search..."
              style={{
                width: "300px",
                borderRadius: "10px",
                backgroundColor: "#A3A7A4",
                border: "1px solid #A3A7A4",
              }}
            />
            <p>Cart</p>
          </div>
        </div>
        <div className={classes.imageList}>
          {dataItem.map((item) => (
            <div className={classes.list}>
              <p className={classes.listName}>{item.name}</p>
              <img
                src={item.image}
                alt=""
                style={{ width: "350px", height: "200px", marginTop: "1rem" }}
              />
              <div className={classes.priceButton}>
                {" "}
                <p>
                  Price:
                  {item.price}
                  {""}ks
                </p>
                <Button
                  variant="outline"
                  style={{
                    borderRadius: "10px",
                    width: "100px",
                    backgroundColor: "#A3A7A4",
                    color: "black",
                    border: "1px solid #A3A7A4",
                  }}
                >
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
