import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const authAndRoleMatch = (auth, properties) => auth.isAuthenticated === true && properties.role === auth?.user?.type;

const PrivateRoute = ({ component: Component, auth, ...restOfProperties }) => (
  <Route {...restOfProperties} render={(props) => (authAndRoleMatch(auth, restOfProperties) ? <Component {...props} /> : <Redirect to="/login" />)} />
);

const mapStateToProps = (state) => ({ auth: state.authReducer });

export default connect(mapStateToProps, {})(PrivateRoute);
