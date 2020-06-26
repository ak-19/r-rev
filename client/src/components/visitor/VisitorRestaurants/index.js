import React, { Component } from "react";
import { Header, Container, Item } from "semantic-ui-react";
import { connect } from "react-redux";
import RestaurantCardSimple from "./RestaurantCardSimple";
import Filter from "./Filter";
import { getRestaurants } from "../../../actions/visitor";
import { withRouter } from "react-router-dom";

class VisitorRestaurants extends Component {
  state = { ratingFilter: 0 };
  componentDidMount = () => this.props.getRestaurants();
  applyFilter = (ratingFilter) => this.setState({ ratingFilter });
  generateRestaurantList() {
    const { restaurants } = this.props.data;
    const { ratingFilter } = this.state;
    return restaurants
      .filter((r) => (ratingFilter ? Math.floor(r.avg || 0) === ratingFilter : true))
      .map((restaurant) => <RestaurantCardSimple key={restaurant.id} {...restaurant} />);
  }
  render() {
    return (
      <Container text>
        <Header textAlign="center" as="h1">
          Restaurant list
        </Header>
        <Filter changedRate={this.applyFilter} />
        <Item.Group>{this.generateRestaurantList()}</Item.Group>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.visitorReducer,
  errorProvider: state.errorReducer,
});

export default connect(mapStateToProps, { getRestaurants })(withRouter(VisitorRestaurants));
