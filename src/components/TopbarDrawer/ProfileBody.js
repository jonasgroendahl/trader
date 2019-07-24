import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Tab1 from "./ProfileTabOne";
import ProfilePic from "../ProfilePic";

export default function ProfileBody({ tab, items, setMenuOpen, user, onSave, setSelectedItem }) {
  const [tempUser, setTempUser] = useState({
    name: "",
    city: "",
    country: "",
    description: "",
    img: ""
  });
  const inputRef = useRef(null);

  function handleChange(e) {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const fr = new FileReader();
      fr.addEventListener("load", function() {
        setTempUser({ ...tempUser, img: fr.result });
      });
      fr.readAsDataURL(file);
    }
  }

  useEffect(() => {
    setTempUser({
      name: user.name,
      city: user.city,
      description: user.description,
      img: user.img,
      country: user.country
    });
  }, []);

  function handleSave() {
    const { img, ...rest } = tempUser;

    onSave({ ...rest, file: inputRef.current.files[0] ? inputRef.current.files[0] : undefined });
  }

  return (
    <div>
      {tab === 0 && (
        <Tab1 items={items} setMenuOpen={setMenuOpen} setSelectedItem={setSelectedItem} />
      )}
      {tab === 1 && (
        <div className="container">
          <Grid container direction="column">
            <ProfilePic src={tempUser.img} size="large" onClick={() => inputRef.current.click()} />
            <TextField
              name="name"
              label="Name"
              margin="dense"
              value={tempUser.name}
              onChange={handleChange}
            />
            <TextField
              name="description"
              multiline
              rows="3"
              margin="dense"
              label="Description"
              value={tempUser.description}
              onChange={handleChange}
            />
            <TextField
              name="country"
              label="Country"
              margin="dense"
              value={tempUser.country}
              onChange={handleChange}
            />
            <TextField
              name="city"
              label="City"
              margin="dense"
              value={tempUser.city}
              onChange={handleChange}
            />
          </Grid>
          <div style={{ position: "fixed", bottom: 0, padding: 15, left: 0 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save changes
            </Button>
          </div>
          <input type="file" onChange={handleUpload} ref={inputRef} />
        </div>
      )}
    </div>
  );
}
