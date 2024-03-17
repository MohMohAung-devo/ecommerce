import React, { useEffect, useState } from "react";
import { columns } from "@/pages/product-add/component/Column";
import { DataTable } from "@/pages/product-add/component/Data-table";
import classes from "./ProductAdd.module.css";
import AddProduct from "@/pages/product-add/component/add-product";
import { Button } from "@/components/ui/button";
import { useAddProduct } from "@/api/productApp/query";

export const ProductAdd = () => {
  const { data, isError } = useAddProduct();
  console.log({ data });

  if (isError) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={classes.ProductContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.Container}>
          <h2>Add Product</h2>
          <AddProduct />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductAdd;
