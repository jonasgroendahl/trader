import React from "react";
import {
  Dialog,
  IconButton,
  Slide,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";
import getCloudinaryUrl from "../utils/getCloudinaryUrl";
import "./User.scss";
import ProfilePicMemo from "../components/ProfilePic";

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction ? props.direction : "left"} ref={ref} {...props} />;
});

export default function User({ name = "", img, id, toggle }) {
  const imageUrl = getCloudinaryUrl(img);

  return (
    <Dialog fullScreen open={Boolean(id)} TransitionComponent={SlideTransition} className="User">
      <IconButton onClick={toggle}>
        <KeyboardBackspace />
      </IconButton>
      <img src={imageUrl} height={200} />
      <ListItem>
        <ListItemAvatar>
          <Avatar src={imageUrl}>{name.substr(0, 1)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={id} />
      </ListItem>
    </Dialog>
  );
}
