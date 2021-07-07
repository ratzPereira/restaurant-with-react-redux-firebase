import classes from "./WeekDayOption.module.css";
import Card from "../UI/Card";

const WeekDayOption = (props) => {
  return (
    <div>
      <p className={classes.name}>{props.plate.Name ? props.plate.Name : ""}</p>
      <img src={props.plate.img} alt="" className={classes.image} />
      {props.plate.Price && (
        <p className={classes.price}>Price: {props.plate.Price}$</p>
      )}
    </div>
  );
};

export default WeekDayOption;
