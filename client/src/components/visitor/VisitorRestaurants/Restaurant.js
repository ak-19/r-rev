import React, { Component } from "react";
import { Container, Button, Form, Grid } from "semantic-ui-react";
import Rater from "./Rater";

export default class Restaurant extends Component {
  state = {
    ...this.props,
    rating: 0,
    comment: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  changeRate = (rating) => this.setState({ rating });
  changeComment = (e) => this.setState({ comment: e.target.value });
  render() {
    return (
      <Container text>
        <Grid columns={2}>
          <Grid.Column>
            <div>Average rating {this.state.avg}</div>
            <div>Maximum rating {this.state.max}</div>
            <div>Minimum rating {this.state.min}</div>
            <div>Your rating {this.state.rating}</div>
            <div>Your comment {this.state.comment}</div>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={this.onSubmit}>
              <Rater onChangeState={this.changeRate} />
              <Form.TextArea
                style={{ width: "250px" }}
                value={this.state.comment}
                onChange={this.changeComment}
              />
              <Button
                content="Rate and add Comment"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
