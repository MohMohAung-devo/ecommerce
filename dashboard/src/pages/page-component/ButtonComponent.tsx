import React from "react";
import { Button } from "@/components/ui/button";
import classes from "./ButtonComponent.module.css";
const SearchComponemt = () => {
  return (
    <div className={classes.ButtonContainer}>
      <div className={classes.Container}>
        <input placeholder="Search....." className={classes.input} />
        <Button className={classes.ButtonContainer} variant="outline">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchComponemt;
