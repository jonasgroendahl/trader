import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import Context from "./Context";
import getCloudinaryUrl from "../utils/getCloudinaryUrl";

const ProfilePicMemo = React.memo(ProfilePic);

function ProfilePic({ size = "normal", src, onClick }) {
  const { user } = useContext(Context);

  let name = user.name;
  if (!name) name = "";

  let imageUrl = "";
  if (src) {
    imageUrl = src;
  } else if (user.img) {
    imageUrl = getCloudinaryUrl(user.img);
  }

  return (
    <Avatar onClick={onClick} src={imageUrl} className={size === "large" ? "large" : ""}>
      {name.substr(0, 1)}
    </Avatar>
  );
}

export default ProfilePicMemo;
