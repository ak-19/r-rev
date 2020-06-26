import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "users" };
  }

  handleItemClick = (e) => this.setState({ activeItem: e.target.id });

  logout = () => {
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    return (
      <Menu secondary>
        <Link
          id="users"
          name="users"
          className={this.state.activeItem === "users" ? "active item" : "item"}
          to="/admin"
          onClick={this.handleItemClick}
        >
          Users
        </Link>
        <Link
          id="restaurants"
          name="restaurants"
          className={this.state.activeItem === "restaurants" ? "active item" : "item"}
          to="/adminrestaurants"
          onClick={this.handleItemClick}
        >
          Restaurants
        </Link>
        <Link
          id="reviews"
          name="reviews"
          className={this.state.activeItem === "reviews" ? "active item" : "item"}
          to="/adminreviews"
          onClick={this.handleItemClick}
        >
          Reviews
        </Link>
        <Menu.Menu position="right">
          <Menu.Item name="logout" id="logout" active={this.state.activeItem === "logout"} onClick={this.logout} />
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

export default connect(mapStateToProps, { logoutUser })(withRouter(AdminNavbar));
