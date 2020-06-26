import React, { Component } from "react";
import { Comment, Form, Button, Header, Container, Loader, Message, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeOwnerReply } from "../../../actions/owner";

class ReviewCard extends Component {
  state = { reply: "" };
  sendReply = () => {
    const { reply } = this.state;
    const { reviewerId, restaurantId } = this.props;
    this.setState({ sending: true });
    setTimeout(() => this.props.makeOwnerReply(reviewerId, restaurantId, reply), 1000);
  };

  handleChange = (e, { value }) => this.setState({ reply: value, sending: false, error: "" });

  componentDidUpdate = (prevProps) => {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { error } = this.props.errorProvider;
      const { message, reviewerId, restaurantId } = error;
      if (this.props.reviewerId === reviewerId && this.props.restaurantId === restaurantId) {
        this.setState({ error: message, sending: false });
      }
    }
  };

  render() {
    const { sending, error } = this.state;
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          {this.props.restaurantName}
        </Header>
        <Comment>
          <Comment.Content>
            <Comment.Author as="a">{this.props.reviewerName}</Comment.Author>
            <Comment.Metadata>
              <div>{this.props.visitDate}</div>
            </Comment.Metadata>
            <Comment.Text>{this.props.comment}</Comment.Text>
          </Comment.Content>
        </Comment>

        <Form reply onSubmit={this.sendReply}>
          <Form.TextArea style={{ height: "50px" }} onChange={this.handleChange} value={this.state.reply} />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
        {sending ? (
          <Container text>
            <Segment>
              <Loader active />
              Replying...
            </Segment>
          </Container>
        ) : null}
        {error ? (
          <Message warning>
            <Message.Header>Review error!</Message.Header>
            <p>{error}</p>
          </Message>
        ) : null}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ownerReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { makeOwnerReply })(withRouter(ReviewCard));
