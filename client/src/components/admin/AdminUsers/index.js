import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Header, Segment } from "semantic-ui-react";
import { getAccountsForAdmin } from "../../../actions/admin";

import SingleUserCard from "./SingleUserCard";
class AdminUsers extends Component {
  state = { users: [] };
  componentDidMount = () => this.props.getAccountsForAdmin();

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const { users } = this.props.data;
      this.setState({ users });
    }
  }

  constructUsersList() {
    return this.state.users.map((user) => {
      return (
        <Segment key={user.id}>
          <SingleUserCard key={user.id} {...user} />{" "}
        </Segment>
      );
    });
  }

  render() {
    return (
      <Container text>
        <Header textAlign="center" as="h1">
          Editable account list
        </Header>
        <Container text>{this.constructUsersList()}</Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.adminReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getAccountsForAdmin })(withRouter(AdminUsers));
