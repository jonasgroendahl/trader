import React, { useState, useEffect } from "react";
import "./Post.scss";
import {
  Dialog,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Snackbar
} from "@material-ui/core";
import SlideTransition from "../components/SlideTransition";
import { Lens, KeyboardBackspace, LocationOn } from "@material-ui/icons";
import { users } from "../utils/data";

export default function Listing(props) {
  const { history, match, onMessage } = props;

  const [selectedImage, setSelectedImage] = useState(0);

  const [listing, setListing] = useState({
    name: "",
    profileName: "",
    img: [],
    description: "",
    location: "",
    need: 0,
    type: "skill"
  });
  const [showMessage, setShowMessage] = useState(0);

  useEffect(() => {
    const id = parseInt(match.params.id);

    let found = false;

    for (let user of users) {
      for (let listing of user.listings) {
        if (listing.id === id) {
          const newListing = {
            ...listing,
            profileName: user.name,
            profilePic: user.img,
            profileId: user.id,
            img: [listing.img],
            location: user.location
          };
          if (listing.extraImgs) {
            newListing.img.push(listing.extraImgs);
          }

          console.log(newListing);
          setListing(newListing);
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
  }, [match]);

  const purposeTypeString = listing.need ? "I am looking for" : `I can trade this ${listing.type}`;

  return (
    <Dialog fullScreen open TransitionComponent={SlideTransition} className="Post">
      <IconButton onClick={() => history.goBack()}>
        <KeyboardBackspace />
      </IconButton>
      <div className="imgContainer">
        <img src={listing.img[selectedImage]} height={180} alt="Listing picture" />
        <div className="center-dots">
          {listing.img.map((imgUrl, index) => (
            <Lens key={index} className={index === selectedImage ? "selected" : ""} />
          ))}
        </div>
        <Avatar className="userProfilePic" component="image" src={listing.profilePic} />
      </div>
      <div className="container">
        <Typography variant="body2">{purposeTypeString}</Typography>
        <Typography variant="h5">{listing.name}</Typography>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          {listing.description}
        </Typography>
      </div>
      <Button
        color="primary"
        onClick={() =>
          onMessage({
            userId: listing.profileId,
            name: listing.profileName,
            img: listing.profilePic
          })
        }
      >
        Message contact person
      </Button>
      <Divider />
      <List subheader={<ListSubheader>{`More about ${listing.profileName}`}</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={listing.location} />
        </ListItem>
      </List>
      <Divider />
      <Button onClick={() => setShowMessage(true)}>Report this listing</Button>
      <Snackbar
        message={<span>Thank you for your report!</span>}
        autoHideDuration={3000}
        open={Boolean(showMessage)}
        onClose={() => setShowMessage(false)}
      />
    </Dialog>
  );
}
