import React, { useContext } from "react";
import { users } from "../utils/data";
import CardItem from "../components/CardItem";
import "./Explore.scss";
import Context from "../components/Context";

export default function Explore() {
  const { user } = useContext(Context);

  const data = users.reduce((acc, cur) => {
    if (cur.id !== user.id) {
      const listings = cur.listings.map(listing => ({
        ...listing,
        profileName: cur.name,
        profilePic: cur.img
      }));
      acc.push(...listings);
    }
    return acc;
  }, []);

  return (
    <div className="Explore">
      <div className="grid">
        {data.map((item, i) => (
          <div key={i}>
            <CardItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
