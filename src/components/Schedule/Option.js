import classes from "./Option.module.css";

import React from "react";

const MyComponent = (props) => {
  console.log(props);
  return (
    <div className={classes.card}>
      <h3>{props.children}</h3>
      <select onChange={props.option}>
        <option defaultValue="None">None</option>
        <option value="Meat">Meat</option>
        <option value="Fish">Fish</option>
      </select>
    </div>
  );
};

export default MyComponent;
