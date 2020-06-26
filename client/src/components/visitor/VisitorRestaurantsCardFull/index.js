import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Form, Button, Header, Segment, Message, Icon, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Rater from "../VisitorRestaurants/Rater";
import MyReview from "./MyReview";
import Last2Reviews from "./Last2Reviews";
import { getSingleRestaurantByID, updateSingleRestaurantByID } from "../../../actions/visitor";

class VisitorRestaurantsCardFull extends Component {
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

  checkForMyReview() {
    const { reviews } = this.props?.data?.restaurant;
    const { id } = this.props?.auth?.user;
    const myReview = reviews.find((r) => r.reviewerId === id);
    if (myReview) {
      this.setState({ myReview });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const { restaurant } = this.props.data;
      this.setState({ ...restaurant, loading: false });
      this.checkForMyReview();
    } else if (prevProps.errorProvider !== this.props.errorProvider) {
      const { error } = this.props.errorProvider;
      this.setState({ error, message: "", loading: false });
    }
  }

  componentDidMount = () => this.props.getSingleRestaurantByID(this.state.restaurantid);

  onSubmit = async (e) => {
    e.preventDefault();
    const { rating, comment, restaurantid } = this.state;
    if (!rating) {
      this.setState({ error: "Can not send 0 rating, please choose value from 1 to 5" });
      return;
    }
    this.setState({ message: "Sending review..." });
    setTimeout(() => {
      this.props.updateSingleRestaurantByID(
        restaurantid,
        {
          rating: parseInt(rating),
          comment,
          visitDate: new Date().toLocaleDateString(),
        },
        this.props.history
      );
    }, 1000);
  };

  changeRate = (rating) => this.setState({ rating, error: "" });
  changeComment = (e) => this.setState({ comment: e.target.value, error: "" });

  render() {
    const { error, myReview, reviews, message, loading } = this.state;
    if (loading) {
      return (
        <Container text>
          <Link to="/visitor">Go back</Link>
          <Segment>
            <Loader active />
            Loading...
          </Segment>
        </Container>
      );
    }
    return (
      <Container text>
        <Link to="/visitor">Go back</Link>
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
          <Last2Reviews reviews={reviews} />
        </Grid>
        <Segment>
          {myReview ? (
            <MyReview {...myReview} />
          ) : (
            <Form onSubmit={this.onSubmit}>
              <Rater onChangeState={this.changeRate} />
              <Form.TextArea style={{ width: "600px" }} value={this.state.comment} onChange={this.changeComment} />
              <Button content="Send review" labelPosition="left" icon="edit" primary />
            </Form>
          )}
          {error ? (
            <Message warning>
              <Message.Header>Review error!</Message.Header>
              <p>{error}</p>
            </Message>
          ) : null}
          {message ? (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                {message}
              </Message.Content>
            </Message>
          ) : null}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  data: state.visitorReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getSingleRestaurantByID, updateSingleRestaurantByID })(withRouter(VisitorRestaurantsCardFull));
