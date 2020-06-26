import React from "react";
import { Grid, Header, List, Rating, Comment, Segment } from "semantic-ui-react";

const constructLast2ReviewArray = (reviews) => {
  reviews.sort((a, b) => b.visitDate - a.visitDate);
  return reviews.slice(0, 2).map((r) => {
    return (
      <Segment key={r.restaurantId + r.reviewerId}>
        <Comment>
          <Comment.Content>
            <Comment.Author>
              <Header as="h3">{r.name}</Header>
            </Comment.Author>
            <Comment.Content>
              Rating <Rating icon="star" defaultRating={r.rating} maxRating={5} disabled />
            </Comment.Content>
            <Comment.Content>
              <Comment.Author>Review date</Comment.Author>
              <Comment.Text>{r.visitDate}</Comment.Text>
            </Comment.Content>
            <Comment.Content>
              <Comment.Author>Comment</Comment.Author>
              <Comment.Text>{r.comment}</Comment.Text>
            </Comment.Content>
            <Comment.Content>
              <Comment.Author>Owner reply</Comment.Author>
              <Comment.Text>{r.reply ? r.reply : " -- no reply --"}</Comment.Text>
            </Comment.Content>
          </Comment.Content>
        </Comment>
      </Segment>
    );
  });
};

export default function Last2Reviews(props) {
  return (
    <Grid.Column>
      <Header as="h3">Last 2 reviews</Header>
      <List divided relaxed>
        {constructLast2ReviewArray(props.reviews)}
      </List>
    </Grid.Column>
  );
}
