import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../shared/privateroute";
import Login from "../login/Login";
import Signup from "../login/Signup";
import store from "../../store";
import Layout from "../hoc/layout";
import Navbar from "../partial/navbar";
import Home from "../home";
import OwnerRestaurantAdd from "../owner/OwnerRestaurantAdd";
import OwnerRestaurants from "../owner/OwnerRestaurants";
import OwnerReviews from "../owner/OwnerReviews";
import AdminUsers from "../admin/AdminUsers";
import AdminRestaurants from "../admin/AdminRestaurants";
import AdminReviews from "../admin/AdminReviews";
import "./Application.css";
import VisitorRestaurants from "../visitor/VisitorRestaurants";
import VisitorRestaurantsCardFull from "../visitor/VisitorRestaurantsCardFull";
import JwtDecode from "jwt-decode";
import setAuthToken from "../../util/setAuthToken";
import { setCurrentUser } from "../../actions/auth";
import OwnerRestaurantDetails from "../owner/OwnerRestaurantDetails";
import AdminDeleteAccountMessage from "../admin/AdminUsers/AdminDeleteAccountMessage";
import AdminUpdatedAccountMessage from "../admin/AdminUsers/AdminUpdatedAccountMessage";
import AdminRestaurantMessage from "../admin/AdminRestaurants/AdminRestaurantMessage";
import AdminReviewMessage from "../admin/AdminReviews/AdminReviewMessage";
if (localStorage.token) {
  const user = JwtDecode(localStorage.token);
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    setAuthToken(false);
    store.dispatch(setCurrentUser({}));
  } else {
    setAuthToken(localStorage.token);
    store.dispatch(setCurrentUser(user));
  }
}

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Router>
            <Navbar />
            <Route path="/" exact component={Home} />
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/ownersignup" exact render={(props) => <Signup {...props} accounttype="owner" />} />
              <Route path="/signup" exact render={(props) => <Signup {...props} accounttype="visitor" />} />

              <PrivateRoute role="owner" path="/owner" exact component={OwnerRestaurants} />
              <PrivateRoute role="owner" path="/ownerreviews" exact component={OwnerReviews} />
              <PrivateRoute role="owner" path="/owneradd" exact component={OwnerRestaurantAdd} />
              <PrivateRoute role="owner" path="/ownerrestaurantdetails/:restaurantid" exact component={OwnerRestaurantDetails} />

              <PrivateRoute role="admin" path="/admin" exact component={AdminUsers} />
              <PrivateRoute role="admin" path="/adminrestaurants" exact component={AdminRestaurants} />
              <PrivateRoute role="admin" path="/adminreviews" exact component={AdminReviews} />
              <PrivateRoute role="admin" path="/admindeleteaccountmessage/:accountId" exact component={AdminDeleteAccountMessage} />
              <PrivateRoute role="admin" path="/adminupdatedaccountmessage/:accountId" exact component={AdminUpdatedAccountMessage} />
              <PrivateRoute role="admin" path="/adminrestaurantmessage" exact component={AdminRestaurantMessage} />
              <PrivateRoute role="admin" path="/adminreviewmessage" exact component={AdminReviewMessage} />
              <PrivateRoute role="visitor" path="/visitor" exact component={VisitorRestaurants} />
              <PrivateRoute role="visitor" path="/visitorrestaurantdetails/:restaurantid" exact component={VisitorRestaurantsCardFull} />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default Application;
