import classes from "./Schedule.module.css";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import firebase from "firebase";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { authActions } from "../../store/auth-slice";
import { plates } from "../../assets/Data";
import WeekDayOption from "./WeekDayOption";

const Schedule = (props) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  console.log(props.orderOwnerName);

  const [mondayOption, setMondayOption] = useState([]);
  const [tuesdayOption, setTuesdayOption] = useState([]);
  const [wednesdayOption, setWednesdayOption] = useState([]);
  const [thursdayOption, setThursdayOption] = useState([]);
  const [fridayOption, setFridayOption] = useState([]);

  const getMondayOption = (e) => {
    setMondayOption(findPlatesForDay("Monday", e.target.value));
  };

  const getTuesdayOption = (e) => {
    setTuesdayOption(findPlatesForDay("Tuesday", e.target.value));
  };
  const getWednesdayOption = (e) => {
    setWednesdayOption(findPlatesForDay("Wednesday", e.target.value));
  };
  const getThursdayOption = (e) => {
    setThursdayOption(findPlatesForDay("Thursday", e.target.value));
  };
  const getFridayOption = (e) => {
    setFridayOption(findPlatesForDay("Friday", e.target.value));
  };

  const clearAllFieldsHandler = () => {
    setMondayOption([]);
    setTuesdayOption([]);
    setWednesdayOption([]);
    setThursdayOption([]);
    setFridayOption([]);
  };

  const clearAllImagesHandler = () => {
    setMondayOption([]);
    setTuesdayOption([]);
    setWednesdayOption([]);
    setThursdayOption([]);
    setFridayOption([]);
  };

  const findPlatesForDay = (weekday, type) => {
    if (type === "None") {
      return {
        Day: "",
        Name: "",
        Price: "",
        Type: "",
        id: "",
        img: "",
      };
    }
    return plates.find(
      (plates) => plates.Day === weekday && plates.Type === type
    );
  };

  const submitOrderHandler = (e) => {
    e.preventDefault();

    console.log(mondayOption.Type);

    if (
      !mondayOption.Type &&
      !thursdayOption.Type &&
      !wednesdayOption.Type &&
      !tuesdayOption.Type &&
      !fridayOption.Type
    ) {
      alert("Choose at least one option");
      return;
    }

    db.collection("orders")
      .add({
        orderOwner: user.email,
        mondayChoice: mondayOption.Type ? mondayOption.Type : "None",
        tuesdayChoice: tuesdayOption.Type ? tuesdayOption.Type : "None",
        wednesdayChoice: wednesdayOption.Type ? wednesdayOption.Type : "None",
        thursdayChoice: thursdayOption.Type ? thursdayOption.Type : "None",
        fridayChoice: fridayOption.Type ? fridayOption.Type : "None",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch(authActions.setOrder());
        clearAllFieldsHandler();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={classes.schedule}>
      <h1>Schedule your meals</h1>
      {!props.orderOwnerName && (
        <>
          <div>
            <Card className={classes.card}>
              <h3>Monday:</h3>
              <select onChange={getMondayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <WeekDayOption plate={mondayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <h3>Tuesday:</h3>
              <select onChange={getTuesdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <WeekDayOption plate={tuesdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <h3>Wednesday:</h3>
              <select onChange={getWednesdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <WeekDayOption plate={wednesdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <h3>Thursday:</h3>
              <select onChange={getThursdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <WeekDayOption plate={thursdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <h3>Friday:</h3>
              <select onChange={getFridayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <WeekDayOption plate={fridayOption} />
            </Card>
          </div>
        </>
      )}
      {!props.orderOwnerName && (
        <button onClick={submitOrderHandler} className={classes.myButton}>
          Order Now!
        </button>
      )}
      {!props.orderOwnerName ? (
        <p>No Order Yet</p>
      ) : (
        <Order
          orderData={props.orderOwnerName}
          clearOrderValues={clearAllFieldsHandler}
          clearImageFields={clearAllImagesHandler}
        />
      )}
    </div>
  );
};

export default Schedule;
