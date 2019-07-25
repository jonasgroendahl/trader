import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import Context from "./Context";

const ProfilePicMemo = React.memo(ProfilePic);

function ProfilePic({ size = "normal", src, onClick }) {
  const { user } = useContext(Context);

  let name = user.name;
  if (!name) name = "";

  let imageUrl = "";
  if (src) {
    imageUrl = src;
  } else if (user.img) {
    const index = user.img.indexOf("upload");
    imageUrl = user.img.substr(0, index + 7) + "c_scale,q_auto,w_204" + user.img.substr(index + 6);
  }

  return (
    <Avatar onClick={onClick} src={imageUrl} className={size === "large" ? "large" : ""}>
      {name.substr(0, 1)}
    </Avatar>
  );
}

export default ProfilePicMemo;
