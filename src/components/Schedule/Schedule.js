import classes from "./Schedule.module.css";
import { useState } from "react";
import Card from "../UI/Card";

const Schedule = () => {
  // const [order, setOrder] = useState([]);

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

  return (
    <div className={classes.schedule}>
      <h1>Schedule your meals</h1>
      <div>
        <Card className={classes.card}>
          Monday:
          <select>
            <option defaultValue="None">None</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
          </select>
        </Card>
      </div>
      <div>
        <Card className={classes.card}>
          Tuesday:
          <select>
            <option defaultValue="None">None</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
          </select>
        </Card>
      </div>
      <div>
        <Card className={classes.card}>
          Wednesday:
          <select>
            <option defaultValue="None">None</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
          </select>
        </Card>
      </div>
      <div>
        <Card className={classes.card}>
          Thursday:
          <select>
            <option defaultValue="None">None</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
          </select>
        </Card>
      </div>
      <div>
        <Card className={classes.card}>
          Friday:
          <select>
            <option defaultValue="None">None</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
          </select>
        </Card>
      </div>
      <button className={classes.myButton}>Order Now!</button>
    </div>
  );
};

export default Schedule;
