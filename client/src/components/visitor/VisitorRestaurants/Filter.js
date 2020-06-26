import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

export default class Filter extends Component {
  state = {};
  ratingFilters = [
    { key: 0, text: "Clear", value: null },
    { key: 1, text: "*", value: 1 },
    { key: 2, text: "* *", value: 2 },
    { key: 3, text: "* * *", value: 3 },
    { key: 4, text: "* * * *", value: 4 },
    { key: 5, text: "* * * * *", value: 5 },
  ];
  handleChange = (e, { value }) => {
    if (this.props.changedRate) {
      this.props.changedRate(value);
    }
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Dropdown
        onChange={this.handleChange}
        options={this.ratingFilters}
        placeholder="Filter by rating"
        selection
        value={value}
      />
    );
  }
}
