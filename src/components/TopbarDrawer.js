import React, { useEffect, useState, useContext } from "react";
import { Dialog, AppBar, Toolbar, IconButton } from "@material-ui/core";
import Context from "./Context";
import Profile from "./TopbarDrawer/Profile";
import { KeyboardBackspace } from "@material-ui/icons";
import ProfileBody from "./TopbarDrawer/ProfileBody";
import DrawerMenu from "./TopbarDrawer/AddSkill";
import SlideTransition from "./SlideTransition";

export default function TopbarDrawer({ open, setOpen }) {
  const [tab, setTab] = useState(0);
  const { user, setUser } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const location = navigator.geolocation.getCurrentPosition(position => console.log(position));
      console.log(location);
    }
  }, []);

  function handleChangeAboutMe(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <Dialog fullScreen open={open} TransitionComponent={SlideTransition}>
      <AppBar position="static">
        {menuOpen ? (
          <Toolbar>
            <IconButton onClick={() => setMenuOpen(false)}>
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
          <DrawerMenu onClose={() => setMenuOpen(false)} />
        ) : (
          <ProfileBody
            items={user.listings}
            user={user}
            setUser={handleChangeAboutMe}
            setMenuOpen={setMenuOpen}
            tab={tab}
          />
        )}
      </div>
    </Dialog>
  );
}
