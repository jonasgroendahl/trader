import React from "react";
import CardItem from "../components/CardItem";
import "./Explore.scss";
import { Typography } from "@material-ui/core";

export default function Explore({ listings, user }) {
  return (
    <div className="Explore">
      <div className="grid">
        {listings.length === 0 ? (
          <div className="container">
            <Typography variant="body1">No listings to show at the moment</Typography>
          </div>
        ) : (
          listings
            .filter(i => !user.excludeList.includes(i.id))
            .map((item, i) => (
              <div key={i}>
                <CardItem {...item} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}
