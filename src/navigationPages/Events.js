import React from "react";
import noEvents from "../assets/no-events.png";

export default function Events() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <img src={noEvents} alt="No events" height={300} />
    </div>
  );
}
