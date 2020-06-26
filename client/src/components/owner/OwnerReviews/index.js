import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOwnerReviews } from "../../../actions/owner";
import ReviewCard from "./ReviewCard";

class OwnerReviews extends Component {
  state = {};
  componentDidMount = () => this.props.getOwnerReviews();

  reloadList = () => this.props.getOwnerReviews();

  constructPendingReviewsList = () =>
    this.props.data.reviews.map((review) => <ReviewCard onSentReply={this.reloadList} key={review.restaurantId + review.reviewerId} {...review} />);

  render() {
    return (
      <Container>
        <Header textAlign="center" as="h1">
          Pending reply list
        </Header>
        <Container text>
          <Segment>{this.constructPendingReviewsList()}</Segment>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ownerReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getOwnerReviews })(withRouter(OwnerReviews));
