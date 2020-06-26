import React from "react";
import { Item, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function RestaurantCardSimple(props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="a">{props.name}</Item.Header>
        <Item.Meta>{props.avg ? "Average rating " + props.avg : "There is no rating, be the first to rate"}</Item.Meta>
        <Item.Meta>
          <Rating icon="star" defaultRating={props.avg || 0} maxRating={5} disabled />
        </Item.Meta>
        <Item.Extra>
          <Link to={"/visitorrestaurantdetails/" + props.id}>See details, rate or leave comment...</Link>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
