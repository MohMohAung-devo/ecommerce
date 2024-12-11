import React from "react";
import Photo1 from "../../../../public/Photo.jpg";
import classes from "./ProductDetail.module.css";

export const ProductDetail = () => {
  return (
    <div className={classes.Col1}>
      <div className={classes.Col2}>
        <h1 className={classes.Coltext1}>Product Detail</h1>
        <div className={classes.Col3}>
          <div className={classes.textCol1}>
            <img src={Photo1} alt="" className={classes.imageCol1} />
            <div className={classes.textCol2}>
              <h1>Count</h1>
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
