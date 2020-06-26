import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import OwnerNavbar from "./OwnerNavbar";
import VisitorNavbar from "./VisitorNavbar";

class Navbar extends Component {
  getMenuByAccountType = () => {
    const { type } = this.props.auth?.user;
    if (type === "owner") {
      return <OwnerNavbar />;
    } else if (type === "admin") {
      return <AdminNavbar />;
    } else if (type === "visitor") {
      return <VisitorNavbar />;
    } else {
      return <div />;
    }
  };

  render = () => this.getMenuByAccountType();
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    errorProvider: state.errorReducer,
  };
};

export default connect(mapStateToProps, {})(withRouter(Navbar));
