import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Header, Container, Segment } from "semantic-ui-react";
import { getRestaurants } from "../../../actions/owner";
import Restaurant from "./Restaurant";
import Filter from "./Filter";

class OwnerRestaurants extends Component {
  state = { filterRating: 0 };

  componentDidMount = () => this.props.getRestaurants();
  applyFilter = (filterRating) => this.setState({ filterRating });

  constructRestaurantList() {
    const { restaurants } = this.props?.data;
    const { filterRating } = this.state;
    return restaurants
      .filter((r) => (filterRating ? Math.floor(r.avg || 0) === filterRating : true))
      .map((restaurant) => (
        <Segment key={restaurant.id}>
          <Link to={"/ownerrestaurantdetails/" + restaurant.id}>
            <Restaurant {...restaurant} />
          </Link>
        </Segment>
      ));
  }

  render() {
    return (
      <Container text>
        <Header textAlign="center" as="h1">
          My restaurants list
        </Header>
        <Container text>
          <Filter changedRate={this.applyFilter} />
          <Segment>{this.constructRestaurantList()}</Segment>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ownerReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getRestaurants })(withRouter(OwnerRestaurants));
