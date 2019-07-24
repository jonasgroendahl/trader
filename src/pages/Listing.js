import React, { useState, useEffect, useRef } from "react";
import "./Listing.scss";
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
import { apiUrl } from "../utils/data";

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
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const id = match.params.id;

    fetch(`${apiUrl}/listing/${id}`)
      .then(res => res.json())
      .then(listing => setListing(listing));
  }, [match]);

  function handleStart(e) {
    imgContainerRef.current = e.changedTouches[0].clientX;
  }

  function handleMove(e) {
    const diff = e.changedTouches[0].clientX - imgContainerRef.current;

    if (imgContainerRef.current !== null) {
      if (diff < -25 && selectedImage < listing.img.length - 1) {
        setSelectedImage(selectedImage + 1);
        handleEnd();
      } else if (diff > 25 && selectedImage !== 0) {
        setSelectedImage(selectedImage - 1);
        handleEnd();
      }
    }
  }

  function handleEnd() {
    imgContainerRef.current = null;
  }

  const purposeTypeString = listing.need ? "I am looking for" : `I can trade this ${listing.type}`;

  return (
    <Dialog fullScreen open TransitionComponent={SlideTransition} className="Post">
      <IconButton onClick={() => history.goBack()}>
        <KeyboardBackspace />
      </IconButton>
      <div
        className="imgContainer"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <img
          src={
            listing.img.length > 0
              ? listing.img[selectedImage]
              : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"
          }
          height={180}
          alt="Listing"
        />
        <div className="center-dots">
          {listing.img.map((imgUrl, index) => (
            <Lens key={index} className={index === selectedImage ? "selected" : ""} />
          ))}
        </div>
        <Avatar className="userProfilePic" src={listing.profilePic}>
          {listing.profileName.substr(0, 1)}
        </Avatar>
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
            id: listing.profileId,
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
