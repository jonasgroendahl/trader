import React, { useContext, useState } from "react";
import { Card, CardMedia, CardHeader, Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import "./CardItem.scss";
import { MoreVert, Search, Subject } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Context from "./Context";
import getCloudinaryUrl from "../utils/getCloudinaryUrl";

export default function CardItem({ img, name, profilePic, need, profileName = "", id }) {
  const { user, setUser } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleNotInterested() {
    setUser({ ...user, excludeList: [...user.excludeList, id] });
    setAnchorEl(null);
  }

  return (
    <Card className="CardItem" square>
      <CardHeader
        title={name}
        subheader={profileName}
        avatar={
          <div>
            <Avatar src={getCloudinaryUrl(profilePic)}>{profileName.substr(0, 1)}</Avatar>
            {need ? <Search /> : <Subject />}
          </div>
        }
        action={
          <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        }
      />
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleNotInterested}>Not interested</MenuItem>
      </Menu>
      <Link to={`/listing/${id}`}>
        <CardMedia
          component="img"
          height={170}
          src={
            img.length > 0
              ? getCloudinaryUrl(img[0])
              : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"
          }
        />
      </Link>
    </Card>
  );
}
