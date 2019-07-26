import React, { useState } from "react";
import { Add, Close, Menu } from "@material-ui/icons";
import { Toolbar, IconButton, Tabs, Tab, MenuItem, Menu as MUImenu } from "@material-ui/core";

export default function Profile({ tab, setTab, setMenuOpen, setOpen, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleLogout() {
    window.localStorage.removeItem("user");
    setUser({ id: 0, listings: [], excludeList: [] });
  }

  return (
    <>
      <Toolbar>
        <IconButton onClick={() => setOpen(false)} color="inherit">
          <Close />
        </IconButton>
        <p>Profile</p>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={() => setMenuOpen(true)} color="inherit">
          <Add />
        </IconButton>
        <MUImenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </MUImenu>
        <IconButton color="inherit" onClick={e => setAnchorEl(e.target)}>
          <Menu />
        </IconButton>
      </Toolbar>
      <Tabs value={tab} onChange={(e, value) => setTab(value)}>
        <Tab label="Listings" />
        <Tab label="Me" />
      </Tabs>
    </>
  );
}
