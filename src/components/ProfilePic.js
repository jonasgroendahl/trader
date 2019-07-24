import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import Context from "./Context";

export default function ProfilePic({ onClick, size = "normal", src }) {
  const { user } = useContext(Context);

  let name = user.name;
  if (!name) name = "";

  return (
    <Avatar
      onClick={onClick}
      src={src ? src : user.img}
      className={size === "large" ? "large" : ""}
    >
      {name.substr(0, 1)}
    </Avatar>
  );
}
