import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { data } from "../utils/data";
import Context from "../components/Context";
import CardItem from "../components/CardItem";

export default function Skills() {
  const ctx = useContext(Context);

  const mySkills = ctx.user.have
    .reduce((acc, cur) => {
      acc.push(cur.name);
      return acc;
    }, [])
    .join("|");

  const regex = new RegExp("\\b" + mySkills + "\\b", "gi");

  const mappedProducts = data
    .filter(item => item.name.toLowerCase().match(regex))
    .map(item => <CardItem {...item} />);

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
