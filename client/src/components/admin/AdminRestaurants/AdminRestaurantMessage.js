import React from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
export default function AdminRestaurantMessage(props) {
  return (
    <Container text>
      <Link to="/adminrestaurants">Go back</Link>
      <Header textAlign="center" as="h2">
        Success!
      </Header>
    </Container>
  );
}
