import React from "react";
import { List, ListItem, ListSubheader, ListItemIcon, ListItemText } from "@material-ui/core";
import { SearchOutlined, Star } from "@material-ui/icons";

export default function ChooseAPurpose({ onChange, value }) {
  return (
    <List subheader={<ListSubheader>Choose a purpose</ListSubheader>}>
      <ListItem selected={value === 0} onClick={() => onChange("need", 0)}>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <ListItemText
          primary={"I have an item or skill"}
          secondary={"If you have a cool skill or an item you wish to exchange, select this option"}
        />
      </ListItem>
      <ListItem selected={value === 1} onClick={() => onChange("need", 1)}>
        <ListItemIcon>
          <SearchOutlined />
        </ListItemIcon>
        <ListItemText
          primary={"I'm looking for an item or skill"}
          secondary={
            "Choose this option if you are currently looking for a certain item or skill you wish to trade for"
          }
        />
      </ListItem>
    </List>
  );
}
