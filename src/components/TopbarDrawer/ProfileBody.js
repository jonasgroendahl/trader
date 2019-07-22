import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Tab1 from "./ProfileTabOne";
import ProfilePic from "../ProfilePic";

export default function ProfileBody({ tab, items, setMenuOpen, user, setUser }) {
  return (
    <div>
      {tab === 0 && <Tab1 items={items} setMenuOpen={setMenuOpen} />}
      {tab === 1 && (
        <div className="container">
          <Grid container direction="column">
            <ProfilePic size="large" />
            <TextField
              name="name"
              label="Name"
              margin="dense"
              value={user.name}
              onChange={setUser}
            />
            <TextField
              name="description"
              multiline
              rows="3"
              margin="dense"
              label="Description"
              value={user.description}
              onChange={setUser}
            />
            <TextField
              name="location"
              label="Location"
              margin="dense"
              disabled
              value={user.location}
              onChange={setUser}
            />
          </Grid>
        </div>
      )}
    </div>
  );
}
