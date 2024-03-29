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
import Option from "./Option";
import { useHistory } from "react-router-dom";
import NotAuth from "../UI/NotAuth";

const Schedule = () => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  const [order, setOrder] = useState([]);

  //will render the order if user has one
  useEffect(() => {
    db.collection("orders").onSnapshot((snapshot) => {
      setOrder(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const dispatch = useDispatch();

  const [mondayOption, setMondayOption] = useState([]);
  const [tuesdayOption, setTuesdayOption] = useState([]);
  const [wednesdayOption, setWednesdayOption] = useState([]);
  const [thursdayOption, setThursdayOption] = useState([]);
  const [fridayOption, setFridayOption] = useState([]);

  if (!user) {
    setTimeout(() => {
      history.replace("/auth");
    }, 3000);
    return <NotAuth />;
  }

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
        dispatch(authActions.hasOrderHandler());
      })
      .catch((error) => alert(error.message));
  };

  const orderData = order.map(
    ({
      id,
      data: {
        mondayChoice,
        thursdayChoice,
        tuesdayChoice,
        fridayChoice,
        wednesdayChoice,
        orderOwner,
      },
    }) => {
      return {
        id,
        Monday: mondayChoice,
        Tuesday: tuesdayChoice,
        Wednesday: wednesdayChoice,
        Thursday: thursdayChoice,
        Friday: fridayChoice,
        orderOwner,
      };
    }
  );

  const orderOwnerName = orderData.find(
    (orderOwner) => orderOwner.orderOwner == user.email
  );

  return (
    <div className={classes.schedule}>
      <h1>Schedule your meals</h1>
      {!orderOwnerName && (
        <>
          <div>
            <Card className={classes.card}>
              <Option option={getMondayOption}>Monday:</Option>
              <WeekDayOption plate={mondayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <Option option={getTuesdayOption}>Tuesday:</Option>
              <WeekDayOption plate={tuesdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <Option option={getWednesdayOption}>Wednesday:</Option>
              <WeekDayOption plate={wednesdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <Option option={getThursdayOption}>Thursday:</Option>
              <WeekDayOption plate={thursdayOption} />
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              <Option option={getFridayOption}>Friday:</Option>
              <WeekDayOption plate={fridayOption} />
            </Card>
          </div>
        </>
      )}
      {!orderOwnerName && (
        <button onClick={submitOrderHandler} className={classes.myButton}>
          Order Now!
        </button>
      )}
      {!orderOwnerName ? (
        <p>No Order Yet</p>
      ) : (
        <Order
          orderData={orderOwnerName}
          clearOrderValues={clearAllFieldsHandler}
          clearImageFields={clearAllImagesHandler}
        />
      )}
    </div>
  );
};

export default Schedule;
