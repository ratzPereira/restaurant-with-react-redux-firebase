import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { auth } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const user = useSelector((state) => state.auth.user);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  if (user) {
    history.replace("/");
    return null;
  }

  const switchAuthModeHandler = async () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    //TODO: validation
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailInput.match(regexEmail)) {
      alert("Please insert valid email");
      return;
    }
    if (!passwordInput.length > 6) return;

    setIsLoading(true);

    if (isLogin) {
      auth
        .signInWithEmailAndPassword(emailInput, passwordInput)
        .then((userAuth) => {
          dispatch(
            authActions.login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
            })
          );
        })
        .catch((error) => alert(error.message));
      setIsLoading(false);
    } else {
      auth
        .createUserWithEmailAndPassword(emailInput, passwordInput)
        .then((userAuth) => {
          dispatch(
            authActions.login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
            })
          );
        })
        .catch((error) => alert(error.message));
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            minLength={6}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {/*{hasError && <p>{hasError}</p>}*/}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
