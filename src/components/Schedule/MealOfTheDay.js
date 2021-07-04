import classes from "./MealOfTheDay.module.css";
import Card from "../UI/Card";
import { useState } from "react";

const MealOfTheDay = (props) => {
  const [optionValue, setOptionValue] = useState("None");

  const getOptionHandler = (e) => {
    setOptionValue(e.target.value);
  };
  console.log(optionValue);
  return (
    <Card>
      <span className={classes.span}>{props.days}</span>
      {/*<Meals img={props.img} type={props.type} />*/}
      <select onChange={getOptionHandler}>
        <option defaultValue="None">None</option>
        <option value="Meat">Meat</option>
        <option value="Fish">Fish</option>
      </select>
    </Card>
  );
};

export default MealOfTheDay;
