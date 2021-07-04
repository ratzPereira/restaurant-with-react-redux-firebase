import classes from "./Schedule.module.css";
import { useEffect, useState } from "react";
import firebase from "firebase";

const Schedule = () => {
  const [order, setOrder] = useState([]);

  //will render the order if user has one
  // useEffect(() => {
  //   db.collection("orders").onSnapshot((snapshot) => {
  //     setOrder(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
  //   });
  // }, []);

  //TODO: send order request
  // db.collection("orders").add({
  //   orderOwner: "Ratz",
  //   mondayChoice: "",
  //   tuesdayChoice: "",
  //   wednesdayChoice: "",
  //   thursdayChoice: "",
  //   fridayChoice: "",
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  // });

  return <div className={classes.schedule}>ORDER</div>;
};

export default Schedule;
