import React, { useState } from "react";
import {
  List,
  Dialog,
  IconButton,
  TextField,
  Grid,
  Toolbar,
  AppBar,
  Avatar,
  Typography
} from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";
import "./Chat.scss";
import { format } from "date-fns";

export default function Chat({ conversation, onClose, onChange }) {
  const { img, name = "", messages = [], userId, id } = conversation;

  const [content, setContent] = useState("");

  function handleKeyPress(e) {
    if (e.key === "Enter" && content !== "") {
      onChange({
        content,
        date: format(new Date(), "YYYY-MM-DD HH:mm"),
        id,
        sender: conversation.sender
      });
      setContent("");
    }
  }

  return (
    <Dialog className="Chat" open={Boolean(conversation.id)} fullScreen>
      <div className="chat-container">
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton onClick={onClose} color="inherit">
              <KeyboardBackspace />
            </IconButton>
            <Avatar src={img}>{name.substr(0, 1)}</Avatar>
          </Toolbar>
        </AppBar>
        <List className="chat">
          {messages.map((msg, index) => (
            <Grid container className="chat-message" key={`m_${index}`}>
              <Grid item xs={2}>
                {msg.sender === userId ? <Avatar src={img} /> : null}
              </Grid>
              {msg.sender === userId ? (
                <>
                  <Grid item xs={8}>
                    <Typography variant="body1" className="chat-paragraph">
                      {msg.content}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
                </>
              ) : (
                <Grid item xs={10}>
                  <Typography variant="body1" className="chat-paragraph">
                    {msg.content}
                  </Typography>
                </Grid>
              )}
            </Grid>
          ))}
        </List>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Message"
          InputProps={{ disableUnderline: true }}
          fullWidth
          value={content}
          onKeyPress={handleKeyPress}
          onChange={e => setContent(e.target.value)}
        />
      </div>
    </Dialog>
  );
}
