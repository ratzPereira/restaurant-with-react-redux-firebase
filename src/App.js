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
import NotFound from "./pages/NotFound";

function App() {
  const user = useSelector((state) => state.auth.user);

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
        {!user && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {user && <UserProfile />}
          {!user && <Redirect to="auth" />}
        </Route>
        <Route path="/menu">
          <MenuPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        {user && (
          <Route path="/schedule">
            <SchedulePage />
          </Route>
        )}
        {/*<Route path="*">*/}
        {/*  <Redirect to="/" />*/}
        {/*</Route>*/}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
