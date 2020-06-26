import React from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
export default function AdminDeleteAccountMessage(props) {
  return (
    <Container text>
      <Link to="/admin">Go back</Link>
      <Header textAlign="center" as="h2">
        Account
      </Header>
      <Header textAlign="center" as="h2">
        {props.match.params.accountId}
      </Header>
      <Header textAlign="center" as="h3">
        Deleted successfully!
      </Header>
    </Container>
  );
}
