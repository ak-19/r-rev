import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    type: this.props.accounttype,
    error: "",
  };

  updateProp = (e) => {
    e.preventDefault();
    const { state } = this;
    state[e.target.name] = e.target.value;
    state.error = null;
    this.setState(state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { errorProvider } = this.props;
      if (errorProvider) {
        this.updateError(errorProvider.error);
      }
    }
  }

  updateError = (error) => this.setState({ error });

  tryRegister = async (e) => this.props.registerUser({ ...this.state }, this.props.history);

  render() {
    const { error } = this.state;
    return (
      <Grid textAlign="center" style={{ height: "100vh", marginTop: "10px" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup to our system
          </Header>
          <Form size="large" onSubmit={this.tryRegister}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.email}
                name="email"
                onChange={this.updateProp}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="true"
                value={this.state.password}
                onChange={this.updateProp}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Repeat password"
                type="password"
                name="password2"
                autoComplete="true"
                value={this.state.password2}
                onChange={this.updateProp}
              />

              <Button color="teal" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
          {error ? (
            <Message warning>
              <Message.Header>Create error!</Message.Header>
              <p>{error}</p>
            </Message>
          ) : null}
          <Message>
            <Link to="/">Login here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
