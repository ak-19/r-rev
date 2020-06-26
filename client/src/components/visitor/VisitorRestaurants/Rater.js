import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

export default class Rater extends Component {
  state = { rating: 0 };

  handleChange = (e) => {
    const rating = e.target.value;
    if (this.props.onChangeState) {
      this.props.onChangeState(rating);
    }
    this.setState({ rating });
  };

  render() {
    const { rating } = this.state;

    return (
      <div>
        <div>Your rating: {rating}</div>
        <input
          type="range"
          min={0}
          max={5}
          value={rating}
          onChange={this.handleChange}
        />
        <br />
        <Rating rating={this.state.rating} maxRating={5} />
      </div>
    );
  }
}
