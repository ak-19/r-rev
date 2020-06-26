import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    const { type } = this?.props?.auth?.user;
    if (type === "owner") {
      this.props.history.push("/owner");
    } else if (type === "admin") {
      this.props.history.push("/admin");
    } else if (type === "visitor") {
      this.props.history.push("/visitor");
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return <div>Welcome to restaurant review</div>;
  }
}

const mapPropsToState = (state) => ({
  auth: state.authReducer,
});

export default connect(mapPropsToState, {})(withRouter(Home));
