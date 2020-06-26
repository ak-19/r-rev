import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import SingleRestaurantCard from "./SingleRestaurantCard";
import { getAdminRestaurants } from "../../../actions/admin";

class AdminRestaurants extends Component {
  componentDidMount = () => this.props.getAdminRestaurants();
  constructRestaurantList = () => this.props.data.restaurants.map((restaurant) => <SingleRestaurantCard key={restaurant.id} {...restaurant} />);
  render = () => <Container text>{this.constructRestaurantList()}</Container>;
}

const mapStateToProps = (state) => ({ data: state.adminReducer });

export default connect(mapStateToProps, { getAdminRestaurants })(withRouter(AdminRestaurants));
