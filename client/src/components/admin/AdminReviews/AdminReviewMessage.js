import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function AdminReviewMessage() {
  return (
    <Container text>
      <Link to="/adminreviews">Go back</Link>
      <Header textAlign="center" as="h2">
        Success!
      </Header>
    </Container>
  );
}
