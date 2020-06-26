import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Segment, Container, Button, Message } from "semantic-ui-react";
import { adminDeleteAccount, adminUpdateAccount } from "../../../actions/admin";

const accoutTypesOptions = [
  { key: "admin", text: "admin", value: "admin" },
  { key: "visitor", text: "visitor", value: "visitor" },
  { key: "owner", text: "owner", value: "owner" },
];

class SingleUserCard extends Component {
  state = { ...this.props, password: "" };
  handleChange = (e, { name, value }) => this.setState({ [name]: value, error: "" });

  submitChanges = () => {
    const { id, email, password, type } = this.state;
    this.props.adminUpdateAccount(id, { email, password, type }, this.props.history);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      if (prevProps.errorProvider.error) {
        const { message: error, userId } = prevProps.errorProvider.error;
        if (userId === this.props.id) {
          this.setState({ error });
        }
      }
    }
  }

  onDelete = async () => this.props.adminDeleteAccount(this.state.id, this.props.history);

  render() {
    const { error } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.submitChanges}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
            <Form.Input
              fluid
              label="New password"
              placeholder="New password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label="Type"
              name="type"
              options={accoutTypesOptions}
              placeholder="Type"
              value={this.state.type}
              onChange={this.handleChange}
            />
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
            <p>{error}</p>
          </Message>
        ) : null}
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.adminReducer, errorProvider: state.errorReducer });

export default connect(mapStateToProps, { adminDeleteAccount, adminUpdateAccount })(withRouter(SingleUserCard));
