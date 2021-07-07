import classes from "./WeekDayOption.module.css";
import Card from "../UI/Card";

const WeekDayOption = (props) => {
  console.log(props.plate);
  return (
    <div>
      <img src={props.plate.img} alt="" />
    </div>
  );
};

export default WeekDayOption;
