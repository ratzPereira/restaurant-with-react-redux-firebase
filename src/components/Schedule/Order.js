import React from "react";
import { plates } from "../../assets/Data";
import classes from "./Order.module.css";

function Order(props) {
  const monday = props.orderData.Monday;
  const tuesday = props.orderData.Tuesday;
  const wednesday = props.orderData.Wednesday;
  const thursday = props.orderData.Thursday;
  const friday = props.orderData.Friday;

  const choices = [
    {
      weekday: "Monday",
      choice: monday,
    },
    {
      weekday: "Tuesday",
      choice: tuesday,
    },
    {
      weekday: "Wednesday",
      choice: wednesday,
    },
    {
      weekday: "Thursday",
      choice: thursday,
    },
    {
      weekday: "Friday",
      choice: friday,
    },
  ];

  let options = [];
  let total = 0;

  choices
    .filter((choiceOpt) => choiceOpt.choice != "None")
    .find((choice) => {
      plates.forEach((plate, index) => {
        if (plate.Type === choice.choice && plate.Day === choice.weekday) {
          total += plate.Price;
          options.push(
            <div key={index}>
              <p className={classes.name}>{plate.Name}</p>
              <img src={plate.img} alt={"thisisaoption"} />
              <p>Price: {plate.Price}$</p>
            </div>
          );
        }
      });
    });

  return (
    <>
      <div className={classes.order}>{options}</div>
      <div>
        <p className={classes.total}>Your grand Total: {total}$</p>
      </div>
    </>
  );
}

export default Order;
