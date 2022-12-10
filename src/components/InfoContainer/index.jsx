import React from "react";
import classes from "./style.module.scss";

function InfoContainer({ title, category }) {
  return (
    <div className={classes.container}>
      <span className={classes.category}> {category}</span>
      <span className={classes.title}> {title}</span>
    </div>
  );
}

export default InfoContainer;
