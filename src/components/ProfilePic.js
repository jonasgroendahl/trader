import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import Context from "./Context";

export default function ProfilePic({ onClick, size = "normal" }) {
  const { user } = useContext(Context);

  return <Avatar onClick={onClick} src={user.img} className={size === "large" ? "large" : ""} />;
}
