import React from "react";
import classes from "./style.module.scss";
import LoadingIcon from "../../icons/LoadingIcon";

function Loading() {
  return (
    <div className={classes.loadingContainer}>
      <LoadingIcon className={classes.loadingIcon}/>
    </div>
  );
}

export default Loading;
