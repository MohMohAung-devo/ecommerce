import React from "react";
import classes from "./CartList.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";

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
              <div className={classes.detail}>
                {" "}
                <p className={classes.productName}>{item.name}</p>
                <button className={classes.productButton}>
                  Product Detail
                </button>
              </div>

              <img
                src={item.image}
                alt=""
                style={{ width: "100%", height: "70%", borderRadius: "10px" }}
              />
              <p>Price - {item.price}$</p>
              <div className={classes.priceList}>
                {" "}
                <p>Total Count - {item.count}</p>
                <p>Total Price - {item.totalPrice}$</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartList;
