import React from "react";
import {
  List,
  ListSubheader,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Star, ShoppingBasket } from "@material-ui/icons";

export default function ChooseAType({ onChange, value }) {
  return (
    <List subheader={<ListSubheader>Choose a type</ListSubheader>}>
      <Divider />
      <ListItem selected={value === "skill"} onClick={() => onChange("type", "skill")}>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <ListItemText
          primary={"Skill"}
          secondary={
            "A skill is a human ability that may be useful to others such as good with computers, travel expert, fluent in a language"
          }
        />
      </ListItem>
      <ListItem selected={value === "item"} onClick={() => onChange("type", "item")}>
        <ListItemIcon>
          <ShoppingBasket />
        </ListItemIcon>
        <ListItemText
          primary={"Item"}
          secondary={
            "A product is an item that may be exchanged with others, example couch, printer"
          }
        />
      </ListItem>
    </List>
  );
}
