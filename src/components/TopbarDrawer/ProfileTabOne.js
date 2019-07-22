import React from "react";
import { List, ListItem, Typography, ListItemIcon, ListItemText } from "@material-ui/core";
import { Subject, Search } from "@material-ui/icons";

export default function Tab1({ items = [], setMenuOpen }) {
  return (
    <List>
      {items.length > 0 ? (
        items.map(item => (
          <ListItem divider>
            <ListItemIcon>{item.need ? <Search /> : <Subject />}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))
      ) : (
        <Typography variant="body1" className="container">
          You didn't add any stuff or skills yet that you may have be needing or wanting to trade.
          Click the plus to get started.
        </Typography>
      )}
    </List>
  );
}
