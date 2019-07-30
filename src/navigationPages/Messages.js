import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Typography,
  IconButton,
  Divider
} from "@material-ui/core";
import { distanceInWordsToNow } from "date-fns";
import Chat from "../components/Chat";
import { Refresh } from "@material-ui/icons";
import getCloudinaryUrl from "../utils/getCloudinaryUrl";

export default function Messages({ conversations = [], onChange, userId, refreshConversations }) {
  const [selectedConversation, setSelectedConversation] = useState({});

  return (
    <div>
      {conversations.length === 0 && (
        <div className="container">
          <Typography variant="body1">No recorded conversations</Typography>
        </div>
      )}
      <div>
        <IconButton onClick={refreshConversations}>
          <Refresh />
        </IconButton>
      </div>
      <Divider />
      <List>
        {conversations.map((con, index) => {
          let name;
          let img;
          if (con.receiver.id === userId) {
            name = con.sender.name;
            img = con.sender.img;
          } else {
            name = con.receiver.name;
            img = con.receiver.img;
          }
          return (
            <ListItem button divider key={index} onClick={() => setSelectedConversation(con)}>
              <ListItemAvatar>
                <Avatar src={getCloudinaryUrl(img)}>{name.substr(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={distanceInWordsToNow(con.last_active)} />
            </ListItem>
          );
        })}
      </List>
      <Chat
        conversation={selectedConversation}
        onClose={() => setSelectedConversation({})}
        onChange={onChange}
        userId={userId}
      />
    </div>
  );
}
