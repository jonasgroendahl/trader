import React from "react";
import {
  List,
  ListItem,
  Paper,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import "./Search.scss";
import { Search } from "@material-ui/icons";

const suggestions = [
  { name: "Couch", type: "item" },
  { name: "Gaming console", type: "item" },
  { name: "Chair", type: "item" }
];

export default function SearchDrawer({ search, onClick }) {
  return (
    <Paper square className="SearchDrawer">
      <List subheader={<ListSubheader>Type</ListSubheader>}>
        <Divider />
        <ListItem button>Skill</ListItem>
        <ListItem button>Item</ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Suggestions</ListSubheader>}>
        <Divider />
        {suggestions
          .filter(item => item.name.toLowerCase().includes(search))
          .map((item, index) => (
            <ListItem button onClick={() => onClick(item.name)} key={index}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
}
