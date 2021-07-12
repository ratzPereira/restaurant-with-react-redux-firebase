import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { authActions } from "../../store/auth-slice";
import Order from "../Schedule/Order";

const ProfileForm = (props) => {
  const newPasswordInput = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userOrder = useSelector((state) => state.auth.hasOrder);

  console.log(userOrder);

  const history = useHistory();

  const changePasswordHandler = (event) => {
    event.preventDefault();

    const newInputPassword = newPasswordInput.current.value;

    if (newInputPassword.length < 6) {
      alert("You password must be 6 characters long");
      return;
    }

    auth.currentUser
      .updatePassword(newInputPassword)
      .then(() => {
        dispatch(authActions.logout());
        history.replace("/auth");
      })
      .catch((error) => alert(error.message));
  };

  const redirectToOrderHandler = () => {
    history.replace("/schedule");
  };

  return (
    <div>
      <form className={classes.form} onSubmit={changePasswordHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password for {user.email}</label>
          <input
            type="password"
            id="new-password"
            required
            minLength={6}
            ref={newPasswordInput}
          />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
      {userOrder && (
        <div className={classes.action}>
          <p className={classes.orderTitle}>You have one order:</p>
          <p className={classes.orderInfo}>Click below to see your order</p>
          <button onClick={redirectToOrderHandler}>View Order</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
