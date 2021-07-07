import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import SchedulePage from "./pages/SchedulePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { authActions } from "./store/auth-slice";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [order, setOrder] = useState([]);

  //will render the order if user has one
  useEffect(() => {
    db.collection("orders").onSnapshot((snapshot) => {
      setOrder(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

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

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          authActions.login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        //user is logged out
        dispatch(authActions.logout());
      }
    });
  }, [dispatch]);

  const orderOwnerName = orderData.find(
    (orderOwner) => orderOwner.orderOwner == user.email
  );

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {isLoggedIn && <UserProfile orderOwnerName={orderOwnerName} />}
          {!isLoggedIn && <Redirect to="auth" />}
        </Route>
        <Route path="/menu">
          <MenuPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        {isLoggedIn && (
          <Route path="/schedule">
            <SchedulePage orderOwnerName={orderOwnerName} />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
