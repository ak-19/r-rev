import React, { Component } from "react";
import { Form, Container, Segment, Message, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewRestaurant, clearDoneAndGoBack } from "../../../actions/owner";

class OwnerRestaurantAdd extends Component {
  state = { value: "", error: "" };

  handleChange = (e) => this.setState({ value: e.target.value, error: "" });

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { error } = this.props.errorProvider;
      this.setState({ error });
    }
  }

  submitNewRestaurant = async (e) => {
    e.preventDefault();
    const { value: name } = this.state;
    this.props.createNewRestaurant(name, this.props.history);
  };

  leave = () => this.props.clearDoneAndGoBack(this.props.history);

  render() {
    const { error } = this.state;
    const { done } = this.props.data;
    if (done) {
      return (
        <Container text>
          <Segment>
            <Message info>
              <Message.Header>Success!</Message.Header>
              <p>{done}</p>
              <Button onClick={this.leave}>Done</Button>
            </Message>
          </Segment>
        </Container>
      );
    }
    return (
      <Container text>
        <Segment>
          <Form onSubmit={this.submitNewRestaurant}>
            <Form.Group widths="equal">
              <Form.Input fluid label="Restaurant name" placeholder="New restaurant name" value={this.state.value} onChange={this.handleChange} />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
          {error ? (
            <Message warning>
              <Message.Header>Create error!</Message.Header>
              <p>{error}</p>
            </Message>
          ) : null}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ownerReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { clearDoneAndGoBack, createNewRestaurant })(withRouter(OwnerRestaurantAdd));
