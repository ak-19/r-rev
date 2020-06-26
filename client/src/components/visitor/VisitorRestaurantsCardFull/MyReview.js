import React from "react";
import { Rating, Container, Comment } from "semantic-ui-react";

export default function MyReview({ comment, rating, reply }) {
  return (
    <Container>
      <Comment>
        <Comment.Content>
          <Comment.Metadata>
            <b>My rating</b>
          </Comment.Metadata>
          <Comment.Text>
            <Rating icon="star" defaultRating={rating} maxRating={5} disabled />
          </Comment.Text>
        </Comment.Content>
      </Comment>
      <Comment>
        <Comment.Content>
          <Comment.Metadata>
            <b>My comment</b>
          </Comment.Metadata>
          <Comment.Text>
            <p>{comment ? comment : " - "}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
      <Comment>
        <Comment.Content>
          <Comment.Metadata>
            <b>Owner reply</b>
          </Comment.Metadata>
          <Comment.Text>
            <p>{reply ? reply : " -- waiting for reply -- "}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Container>
  );
}
