import classes from "./Schedule.module.css";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import firebase from "firebase";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { authActions } from "../../store/auth-slice";

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

  const getMondayOption = (e) => {
    setMondayOption(e.target.value);
  };
  const getTuesdayOption = (e) => {
    setTuesdayOption(e.target.value);
  };
  const getWednesdayOption = (e) => {
    setWednesdayOption(e.target.value);
  };
  const getThursdayOption = (e) => {
    setThursdayOption(e.target.value);
  };
  const getFridayOption = (e) => {
    setFridayOption(e.target.value);
  };

  const submitOrderHandler = (e) => {
    e.preventDefault();
    console.log(
      mondayOption,
      thursdayOption,
      wednesdayOption,
      fridayOption,
      tuesdayOption
    );

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
              Monday:
              <select onChange={getMondayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              Tuesday:
              <select onChange={getTuesdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              Wednesday:
              <select onChange={getWednesdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              Thursday:
              <select onChange={getThursdayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
            </Card>
          </div>
          <div>
            <Card className={classes.card}>
              Friday:
              <select onChange={getFridayOption}>
                <option defaultValue="None">None</option>
                <option value="Meat">Meat</option>
                <option value="Fish">Fish</option>
              </select>
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
        <Order orderData={orderOwnerName} />
      )}
    </div>
  );
};

export default Schedule;
