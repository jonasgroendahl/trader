import React from "react";
import { Card, CardMedia, CardHeader, Avatar, IconButton } from "@material-ui/core";
import "./CardItem.scss";
import { MoreVert, Search, Subject } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function CardItem({
  img,
  name,
  profilePic,
  userName = "",
  type,
  need,
  profileName = "",
  id
}) {
  return (
    <Card className="CardItem" square>
      <CardHeader
        title={name}
        subheader={profileName}
        avatar={
          <div>
            <Avatar src={profilePic}>{userName.substr(0, 1)}</Avatar>
            {need ? <Search /> : <Subject />}
          </div>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
      />
      <Link to={`/listing/${id}`}>
        <CardMedia component="img" height={150} src={img} />
      </Link>
    </Card>
  );
}
