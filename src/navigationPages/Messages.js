import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Typography
} from "@material-ui/core";
import { distanceInWordsToNow } from "date-fns";
import Chat from "../components/Chat";

export default function Messages({ conversations = [], onChange }) {
  const [selectedConversation, setSelectedConversation] = useState({});

  return (
    <div className="container">
      {conversations.length === 0 && (
        <Typography variant="body1">No recorded conversations</Typography>
      )}
      <List>
        {conversations.map((con, index) => (
          <ListItem button divider key={index} onClick={() => setSelectedConversation(con)}>
            <ListItemAvatar>
              <Avatar src={con.img}>{con.name.substr(0, 1)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={con.name} secondary={distanceInWordsToNow(con.last_active)} />
          </ListItem>
        ))}
      </List>
      <Chat
        conversation={selectedConversation}
        onClose={() => setSelectedConversation({})}
        onChange={onChange}
      />
    </div>
  );
}
