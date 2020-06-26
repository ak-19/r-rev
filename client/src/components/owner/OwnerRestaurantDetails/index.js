import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Header, Container, Segment, Grid, Message, List } from "semantic-ui-react";
import { getSingleRestaurantByID } from "../../../actions/owner";
import ReviewItem from "./ReviewItem";

class OwnerRestaurantDetails extends Component {
  state = {
    restaurantid: this.props.match.params.restaurantid,
    name: "",
    reviews: [],
    rating: 0,
    comment: "",
    error: "",
    myReview: "",
    message: "",
    loading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const { restaurant } = this.props.data;
      this.setState({ ...restaurant, loading: false });
    } else if (prevProps.errorProvider !== this.props.errorProvider) {
      const { error } = this.props.errorProvider;
      this.setState({ error, message: "", loading: false });
    }
  }

  componentDidMount = () => this.props.getSingleRestaurantByID(this.state.restaurantid);

  generateReviewList = () => {
    const reviews = this.props.data?.restaurant?.reviews;
    if (reviews) {
      return reviews.map((review) => <ReviewItem key={review.reviewerId} {...review} />);
    }

    return null;
  };

  render() {
    const { error } = this.state;

    return (
      <Container text>
        <Link to="/owner">Go back</Link>
        <Header as="h1" textAlign="center">
          {this.state.name}
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h3">Ratings</Header>
            <div>{"Average rating: " + (this.state.avg || "N/A")}</div>
            <div>{"Maximum rating: " + (this.state.max || "N/A")}</div>
            <div>{"Minimum rating: " + (this.state.min || "N/A")}</div>
          </Grid.Column>
        </Grid>
        <Header as="h2" textAlign="center">
          Reviews
        </Header>
        <List>{this.generateReviewList()}</List>
        {error ? (
          <Segment>
            <Message warning>
              <p>{error}</p>
            </Message>
          </Segment>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ownerReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getSingleRestaurantByID })(withRouter(OwnerRestaurantDetails));
