import React, { useState } from "react";
import Photo1 from "../../../../public/Photo.jpg";
import classes from "./ProductDetail.module.css";

export const ProductDetail = () => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleReduce = () => {
    if (count < 0) {
      return 0;
    } else {
      return setCount(count - 1);
    }
  };
  const cost = 40;

  const totalAccount = cost * count;

  return (
    <div className={classes.Col1}>
      <div className={classes.Col2}>
        <h1 className={classes.Coltext1}>Product Detail</h1>
        <div className={classes.Col3}>
          <div className={classes.textCol1}>
            <img src={Photo1} alt="" className={classes.imageCol1} />
            <div className={classes.textCol2}>
              <div className={classes.Col1Title}>
                <p>Women Clothes</p>
              </div>
              <div className={classes.buttonTitle}>
                <div className={classes.button}>
                  <button
                    style={{
                      width: "100px",
                      backgroundColor: "gray",
                      height: "40px",
                      borderRadius: "10px",
                      color: "white",
                    }}
                    onClick={handleReduce}
                  >
                    Count -0
                  </button>
                </div>
                <div className={classes.button}>
                  <button
                    style={{
                      width: "100px",
                      backgroundColor: "gray",
                      height: "40px",
                      borderRadius: "10px",
                      color: "white",
                    }}
                    onClick={handleAdd}
                  >
                    Count +1
                  </button>
                </div>
              </div>
              <p>Count - {count}</p>
              <p>Cost - $40</p>
              <p>Total Amount - ${totalAccount}</p>
            </div>
          </div>

          <p className={classes.ColText}>
            Descripiton: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Excepturi dolor quas nihil saepe, ipsum qui distinctio, magni
            error porro pariatur itaque veritatis. Dolore voluptate nulla
            laboriosam corrupti quae explicabo voluptas.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
