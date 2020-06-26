import React, { Component } from "react";
import { Segment, Form, Container, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { adminUpdateRestaurant, adminDeleteRestaurant } from "../../../actions/admin";

class SingleRestaurantCard extends Component {
  state = { ...this.props, error: "" };
  handleChange = (e, { name, value }) => this.setState({ [name]: value, error: "" });

  submitChanges = () => {
    const { id, name } = this.state;
    this.props.adminUpdateRestaurant(id, { name }, this.props.history);
  };

  onDelete = () => this.props.adminDeleteRestaurant(this.state.id, this.props.history);

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { message, restaurantId } = this.props.errorProvider.error;
      if (restaurantId === this.state.id) {
        this.setState({ error: message });
      }
    }
  }

  render() {
    const { error } = this.state;
    return (
      <Segment style={{ width: "600px" }}>
        <Form onSubmit={this.submitChanges}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
        <Container textAlign="right">
          <Button onClick={this.onDelete}>
            <i className="trash icon" />
            Delete
          </Button>
        </Container>
        {error ? (
          <Message warning>
            <Message.Header>Update error!</Message.Header>
            <p>{error}</p>
          </Message>
        ) : null}
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.adminReducer, errorProvider: state.errorReducer });

export default connect(mapStateToProps, { adminUpdateRestaurant, adminDeleteRestaurant })(withRouter(SingleRestaurantCard));
