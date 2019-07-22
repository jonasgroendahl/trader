import React, { useEffect, useState } from "react";
import SearchItem from "../components/SearchItem";
import { CircularProgress, Typography } from "@material-ui/core";
import "./Search.scss";
import { users } from "../utils/data";

export default function Search({ searching }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setResults(data);
      })
      .catch(e => setLoading(false));
  }, []);

  const matchRegex = searching.replace(" ", "|");

  const regex = new RegExp("\\b" + matchRegex + "\\b", "gi");

  const data = users.reduce((acc, cur) => {
    const listings = cur.listings.map(listing => ({ ...listing, profileName: cur.name }));
    acc.push(...listings);
    return acc;
  }, []);

  let resultsFound = results
    .filter(el => el.name.toLowerCase().match(regex))
    .map(i => <SearchItem {...i} />);

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
