import React, { useState, useContext } from "react";
import { Dialog, AppBar, Toolbar, IconButton } from "@material-ui/core";
import Context from "./Context";
import Profile from "./TopbarDrawer/Profile";
import { KeyboardBackspace } from "@material-ui/icons";
import ProfileBody from "./TopbarDrawer/ProfileBody";
import SlideTransition from "./SlideTransition";
import AddSkill from "./TopbarDrawer/AddSkill";
import { apiUrl } from "../utils/data";

export default function TopbarDrawer({ open, setOpen }) {
  const [tab, setTab] = useState(0);
  const { user, setUser } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  function handleChangeAboutMe(updateFields) {
    console.log("updateFields", updateFields);
    const fd = new FormData();
    const { file, ...rest } = updateFields;
    if (file) {
      fd.append("img", file);
    }

    fd.append("userInfo", JSON.stringify(rest));

    fetch(`${apiUrl}/user/${user.id}`, {
      method: "PUT",
      body: fd
    })
      .then(res => res.json())
      .then(result => {
        setUser({ ...user, img: result ? result.imgUrl : user.img, ...rest });
        setTab(0);
      });
  }

  function handleSelectItem(item) {
    setMenuOpen(true);
    setSelectedItem(item);
  }

  function handleClose() {
    setMenuOpen(false);
    setSelectedItem(null);
  }

  return (
    <Dialog fullScreen open={open} TransitionComponent={SlideTransition}>
      <AppBar position="static">
        {menuOpen ? (
          <Toolbar>
            <IconButton onClick={handleClose}>
              <KeyboardBackspace style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        ) : (
          <Profile
            tab={tab}
            setUser={setUser}
            setTab={setTab}
            setOpen={setOpen}
            setMenuOpen={setMenuOpen}
          />
        )}
      </AppBar>
      <div>
        {menuOpen ? (
          <AddSkill onClose={handleClose} item={selectedItem} />
        ) : (
          <ProfileBody
            items={user.listings}
            user={user}
            onSave={handleChangeAboutMe}
            setMenuOpen={setMenuOpen}
            tab={tab}
            setSelectedItem={handleSelectItem}
          />
        )}
      </div>
    </Dialog>
  );
}
