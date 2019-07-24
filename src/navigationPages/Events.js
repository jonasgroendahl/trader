import React from "react";
import noEvents from "../assets/no-events.png";
import "./Events.scss";

export default function Events() {
  return (
    <div className="Events container">
      <img src={noEvents} alt="No events" height={300} />
    </div>
  );
}
