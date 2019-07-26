import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import Context from "../components/Context";
import CardItem from "../components/CardItem";

export default function Home({ listings }) {
  const { user } = useContext(Context);

  const myNeeds = user.listings
    .reduce((acc, listing) => {
      const name = listing.name.toLowerCase();
      acc.push(...name.split(" "));
      return acc;
    }, [])
    .join("|");

  const regex = new RegExp("\\b" + myNeeds + "\\b", "gi");

  const mappedProducts = listings
    .filter(
      cur =>
        cur.profileId !== user.id &&
        cur.name.toLowerCase().match(regex) &&
        !user.excludeList.includes(cur.id)
    )
    .map((item, key) => (
      <div key={key}>
        <CardItem {...item} />
      </div>
    ));

  if (mappedProducts.length === 0) {
    return (
      <div className="container">
        <Typography variant="body1">
          Sorry but no listings found that match your current preferences. Tap your profile picture
          to get started.
        </Typography>
      </div>
    );
  }

  return <div>{mappedProducts}</div>;
}
