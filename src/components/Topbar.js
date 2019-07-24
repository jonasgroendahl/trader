import React, { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, TextField, InputAdornment } from "@material-ui/core";
import TopbarDrawer from "./TopbarDrawer";
import ProfilePic from "./ProfilePic";
import { Search, KeyboardBackspace } from "@material-ui/icons";
import "./Topbar.scss";
import SearchDrawer from "./SearchDrawer";
import Context from "./Context";
import logo from "../assets/logo.png";

export default function Topbar({ getListings }) {
  const ctx = useContext(Context);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function submitSearch(keyword) {
    ctx.setSearching(keyword);
    setSearchOpen(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.target.blur();
      submitSearch(search);
    }
  }

  function toggleDrawer(newOpen) {
    setOpen(newOpen);
    // grab new listenings after having the drawer open
    getListings();
  }

  return (
    <AppBar position="sticky" color="default" className="Topbar">
      <Toolbar>
        {searchOpen ? (
          <IconButton onClick={() => setSearchOpen(false)}>
            <KeyboardBackspace />
          </IconButton>
        ) : (
          <img src={logo} height={50} alt="Logo" />
        )}
        <TextField
          className="search"
          InputProps={{
            startAdornment: (
              <InputAdornment style={{ marginRight: 10 }}>
                <Search />
              </InputAdornment>
            ),
            disableUnderline: true
          }}
          type="search"
          placeholder="Search"
          fullWidth
          onFocus={() => setSearchOpen(true)}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {searchOpen ? (
          <SearchDrawer search={search} onClick={submitSearch} />
        ) : (
          <ProfilePic onClick={handleOpen} />
        )}
      </Toolbar>
      <TopbarDrawer open={open} setOpen={toggleDrawer} />
    </AppBar>
  );
}
