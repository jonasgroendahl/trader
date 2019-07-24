import React, { useState } from "react";
import SearchItem from "../components/SearchItem";
import { CircularProgress, Typography } from "@material-ui/core";
import "./Search.scss";

export default function Search({ searching, listings }) {
  const [loading, setLoading] = useState(false);

  const matchRegex = searching.replace(" ", "|");

  const regex = new RegExp("\\b" + matchRegex + "\\b", "gi");

  let resultsFound = listings
    .filter(el => el.name.toLowerCase().match(regex))
    .map((i, index) => (
      <div key={index}>
        <SearchItem {...i} />
      </div>
    ));

  if (resultsFound.length === 0) {
    resultsFound = <Typography variant="body1">Nothing matched your search. Sorry!</Typography>;
  }

  return (
    <div className="Search">
      {loading && <CircularProgress />}
      {resultsFound}
    </div>
  );
}
