import classes from "./Schedule.module.css";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import firebase from "firebase";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { authActions } from "../../store/auth-slice";
import { plates } from "../../assets/Data";

const Schedule = () => {
  const [order, setOrder] = useState([]);

  const userName = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  //will render the order if user has one
  useEffect(() => {
    db.collection("orders").onSnapshot((snapshot) => {
      setOrder(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const user = useSelector((state) => state.auth.user);
  const [mondayOption, setMondayOption] = useState("None");
  const [tuesdayOption, setTuesdayOption] = useState("None");
  const [wednesdayOption, setWednesdayOption] = useState("None");
  const [thursdayOption, setThursdayOption] = useState("None");
  const [fridayOption, setFridayOption] = useState("None");

  const [mondayImage, setMondayImage] = useState("");
  const [tuesdayImage, setTuesdayImage] = useState("");
  const [wednesdayImage, setWednesdayImage] = useState("");
  const [thursdayImage, setThursdayImage] = useState("");
  const [fridayImage, setFridayImage] = useState("");

  const getMondayOption = (e) => {
    setMondayOption(e.target.value);
    const myPlate = findPlate("Monday", e.target.value);
    setMondayImage(myPlate.img);
  };
  const getTuesdayOption = (e) => {
    setTuesdayOption(e.target.value);
    const myPlate = findPlate("Tuesday", e.target.value);
    setTuesdayImage(myPlate.img);
  };
  const getWednesdayOption = (e) => {
    setWednesdayOption(e.target.value);
    const myPlate = findPlate("Wednesday", e.target.value);
    setWednesdayImage(myPlate.img);
  };
  const getThursdayOption = (e) => {
    setThursdayOption(e.target.value);
    const myPlate = findPlate("Thursday", e.target.value);
    setThursdayImage(myPlate.img);
  };
  const getFridayOption = (e) => {
    setFridayOption(e.target.value);
    const myPlate = findPlate("Friday", e.target.value);
    setFridayImage(myPlate.img);
  };

  const findPlate = (weekDay, value) => {
    return plates.find(
      (plate) => plate.Day === weekDay && plate.Type === value
    );
  };

  const clearAllFieldsHandler = () => {
    setThursdayOption("None");
    setFridayOption("None");
    setMondayOption("None");
    setWednesdayOption("None");
    setTuesdayOption("None");
  };

  const submitOrderHandler = (e) => {
    e.preventDefault();

    db.collection("orders")
      .add({
        orderOwner: user.email,
        mondayChoice: mondayOption,
        tuesdayChoice: tuesdayOption,
        wednesdayChoice: wednesdayOption,
        thursdayChoice: thursdayOption,
        fridayChoice: fridayOption,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch(authActions.setOrder());
        clearAllFieldsHandler();
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
    (orderOwner) => orderOwner.orderOwner == userName.email
  );

  return (
    <div className={classes.schedule}>
      <h1>Schedule your meals</h1>
      {!orderOwnerName && (
        <>
          <div>
            <Card className={classes.card}>
              <h3>Monday:</h3>
              <select onChange={getMondayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
              <img src={mondayImage} alt="" />
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
              <img src={tuesdayImage} alt="" />
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
              <img src={wednesdayImage} alt="" />
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
              <img src={thursdayImage} alt="" />
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
              <img src={fridayImage} alt="" />
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
        />
      )}
    </div>
  );
};

export default Schedule;
