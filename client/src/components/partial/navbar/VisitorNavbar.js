import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/auth";
import { Menu } from "semantic-ui-react";
class VisitorNavbar extends Component {
  logout = () => {
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item name="logout" id="logout" active={true} onClick={this.logout} />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    errorProvider: state.errorReducer,
  };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(VisitorNavbar));
