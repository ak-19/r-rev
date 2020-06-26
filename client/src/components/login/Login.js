import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: undefined,
    password: undefined,
    error: undefined,
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorProvider !== this.props.errorProvider) {
      const { errorProvider } = this.props;
      if (errorProvider) {
        this.updateError(errorProvider.error);
      }
    }
  }

  updateError = (error) => {
    const state = this;
    state.error = error;
    this.setState(state);
  };

  submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser(email, password, this.props.history);
  };
  updateProp = (ev) => {
    const { state } = this;
    state.error = undefined;
    state[ev.target.name] = ev.target.value;
    this.setState(state);
  };
  render() {
    const { error } = this.state;
    return (
      <Grid textAlign="center" style={{ height: "100vh", marginTop: "10px" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={this.submitLogin} autoComplete="true">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                text={this.state.email}
                onChange={this.updateProp}
                autoComplete="username"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                text={this.state.password}
                onChange={this.updateProp}
                name="password"
                autoComplete="current-password"
              />

              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          {error ? (
            <Message warning>
              <Message.Header>Login error!</Message.Header>
              <p>{error}</p>
            </Message>
          ) : null}
          <Message>New to us?</Message>
          <Message>
            <Link to="/ownersignup">Sign up as restaurant owner</Link>
          </Message>
          <Message>
            <Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
