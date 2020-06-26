import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getReviewsForAdmin } from "../../../actions/admin";
import SingleReviewCard from "./SingleReviewCard";

class AdminReviews extends Component {
  componentDidMount = () => this.props.getReviewsForAdmin();
  constructRestaurantList = () =>
    this.props.data.reviews.map((review) => <SingleReviewCard key={review.reviewerId + review.restaurantId} {...review} />);

  render = () => <Container text>{this.constructRestaurantList()}</Container>;
}

const mapStateToProps = (state) => ({ data: state.adminReducer });

export default connect(mapStateToProps, { getReviewsForAdmin })(withRouter(AdminReviews));
