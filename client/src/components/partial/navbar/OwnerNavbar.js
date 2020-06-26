import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
class OwnerNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "restaurants" };
  }

  handleItemClick = (e) => this.setState({ activeItem: e.target.id });

  logout = () => {
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    return (
      <Menu secondary>
        <Menu.Menu position="left">
          <Link
            id="restaurants"
            name="restaurants"
            className={this.state.activeItem === "restaurants" ? "active item" : "item"}
            to="/owner"
            onClick={this.handleItemClick}
          >
            Home
          </Link>
          <Link
            id="pending"
            name="pending"
            className={this.state.activeItem === "pending" ? "active item" : "item"}
            to="/ownerreviews"
            onClick={this.handleItemClick}
          >
            Pending review
          </Link>
          <Link
            id="add"
            name="add"
            className={this.state.activeItem === "add" ? "active item" : "item"}
            to="/owneradd"
            onClick={this.handleItemClick}
          >
            Add new restaurant
          </Link>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            id="logout"
            active={this.state.activeItem === "logout"}
            onClick={this.logout}
          />
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

export default connect(mapStateToProps, { logoutUser })(withRouter(OwnerNavbar));
