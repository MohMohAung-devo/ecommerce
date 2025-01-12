import React from "react";
import classes from "./CartList.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";
// import Photo3 from "../../../public/Photo3.jpg";
// import Photo4 from "../../../public/Photo4.jpg";
// import Photo5 from "../../../public/Photo5.jpg";

const CartList = () => {
  const dataItem = [
    {
      name: "Women clothes",
      image: Photo,
      price: 100,
      count: 4,
      totalPrice: 300,
    },
    {
      name: "Women clothes",
      image: Photo1,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    { name: "Jwllery", image: Photo2, count: 4, totalPrice: 300, price: 100 },
    {
      name: "Women clothes",
      image: Photo,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    {
      name: "Women clothes",
      image: Photo1,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    {
      name: "Women clothes",
      image: Photo2,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    {
      name: "Man clothes",
      image: Photo,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    {
      name: "Women clothes",
      image: Photo1,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
    { name: "Cosmetic", image: Photo2, count: 4, totalPrice: 300, price: 100 },
    {
      name: "Women clothes",
      image: Photo,
      count: 4,
      totalPrice: 300,
      price: 100,
    },
  ];

  return (
    <div className={classes.mainDiv}>
      <div className={classes.Col1}>
        <p className={classes.title}>Cart List</p>
        <div className={classes.Col2}>
          {dataItem.map((item) => (
            <div className={classes.list}>
              <p>{item.name}</p>
              <img
                src={item.image}
                alt=""
                style={{ width: "100%", height: "80%" }}
              />
              <p>Price - {item.price}$</p>
              <p>{item.count}</p>
              <p>{item.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartList;
