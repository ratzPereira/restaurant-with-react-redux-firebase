import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import SchedulePage from "./pages/SchedulePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { authActions } from "./store/auth-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
          {isLoggedIn && <UserProfile />}
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
            <SchedulePage />
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
