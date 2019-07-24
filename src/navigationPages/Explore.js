import React from "react";
import CardItem from "../components/CardItem";
import "./Explore.scss";
import { Typography } from "@material-ui/core";

export default function Explore({ listings }) {
  return (
    <div className="Explore">
      <div className="grid">
        {listings.length === 0 ? (
          <div className="container">
            <Typography variant="body1">No listings to show at the moment</Typography>
          </div>
        ) : (
          listings.map((item, i) => (
            <div key={i}>
              <CardItem {...item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
