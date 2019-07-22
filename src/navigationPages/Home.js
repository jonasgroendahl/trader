import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { users } from "../utils/data";
import Context from "../components/Context";
import CardItem from "../components/CardItem";

export default function Home() {
  const { user } = useContext(Context);

  const myNeeds = user.listings.map(listing => listing.name).join("|");

  const regex = new RegExp("\\b" + myNeeds + "\\b", "gi");

  const mappedProducts = users
    .reduce((acc, cur) => {
      if (cur.id !== user.id) {
        const listings = cur.listings
          .filter(listing => listing.name.toLowerCase().match(regex))
          .map(el => ({ ...el, profileName: cur.name, profilePic: cur.img }));
        acc.push(...listings);
      }
      return acc;
    }, [])
    .map((item, key) => (
      <div key={key}>
        <CardItem {...item} />
      </div>
    ));

  if (mappedProducts.length === 0) {
    return (
      <div>
        <Typography className="container" variant="body1">
          Nothing matches your current preferences
        </Typography>
      </div>
    );
  }

  return <div>{mappedProducts}</div>;
}
