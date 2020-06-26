import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

export default class Restaurant extends Component {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <Rating
          icon="star"
          defaultRating={this.props.avg}
          maxRating={5}
          disabled
        />
        <div>{this.props.avg}</div>
      </div>
    );
  }
}
