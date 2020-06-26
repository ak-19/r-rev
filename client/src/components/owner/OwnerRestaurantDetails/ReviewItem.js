import React from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ReviewItem = ({ name, visitDate, comment, reply, rating }) => {
  return (
    <Card>
      <Card.Content>Reviewer: {name}</Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              Rating
              <Feed.Date>{rating}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>
            <Feed.Content>
              Visit Date<Feed.Date>{visitDate}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>
            <Feed.Content>
              Comment<Feed.Date>{comment}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
          <Feed.Event>
            <Feed.Content>
              Reply<Feed.Date>{comment && !reply ? <Link to="/ownerreviews">reply here</Link> : reply}</Feed.Date>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default ReviewItem;
