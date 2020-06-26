import React, { Component } from "react";
import { Segment, Form, Container, Button, Header, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteReviewForAdmin, updateReviewForAdmin } from "../../../actions/admin";
import Rater from "./Rater";

class SingleReviewCard extends Component {
  state = { reply: "", ...this.props, error: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, error: "" });

  submitChanges = () => {
    const { rating, comment, reply, restaurantId, reviewerId } = this.state;
    this.props.updateReviewForAdmin(reviewerId, restaurantId, { rating, comment, reply }, this.props.history);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { message, restaurantId, reviewerId } = this.props.errorProvider.error;
      if (restaurantId === this.state.restaurantId && reviewerId === this.state.reviewerId) {
        this.setState({ error: message });
      }
    }
  }

  onDelete = () => this.props.deleteReviewForAdmin(this.state.reviewerId, this.state.restaurantId, this.props.history);

  render() {
    const { error } = this.state;
    return (
      <Segment>
        <Header as="h3">{this.state.restaurantName}</Header>
        <Segment style={{ width: "600px" }}>
          <Header as="h4">Reviewer: {this.state.name}</Header>
          <Header as="h5">
            Rating:
            <Rater name="rating" rating={this.state.rating} onChange={this.handleChange} />
          </Header>
          <Form onSubmit={this.submitChanges}>
            <Form.Group widths="equal">
              <Form.Input fluid label="Comment" placeholder="comment" name="comment" value={this.state.comment} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input fluid label="Owner reply" placeholder="reply" name="reply" value={this.state.reply} onChange={this.handleChange} />
            </Form.Group>
            <Form.Button>Save changes</Form.Button>
          </Form>
          <Container textAlign="right">
            <Button onClick={this.onDelete}>
              <i className="trash icon" />
              Delete
            </Button>
          </Container>
          {error ? (
            <Message warning>
              <Message.Header>Review error!</Message.Header>
              <p>{error}</p>
            </Message>
          ) : null}
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.adminReducer, errorProvider: state.errorReducer });

export default connect(mapStateToProps, { deleteReviewForAdmin, updateReviewForAdmin })(withRouter(SingleReviewCard));
