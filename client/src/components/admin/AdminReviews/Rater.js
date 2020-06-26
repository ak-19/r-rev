import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

export default class Rater extends Component {
  state = { ...this.props };

  handleChange = (e) => {
    const rating = e.target.value;
    if (this.props.onChangeState) {
      this.props.onChangeState(rating);
    }
    if (this.props.onChange) {
      const { name } = this.props;
      this.props.onChange(this, { value: rating, name });
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
