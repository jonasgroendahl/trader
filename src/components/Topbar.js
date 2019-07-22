import React, { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, TextField, InputAdornment } from "@material-ui/core";
import TopbarDrawer from "./TopbarDrawer";
import ProfilePic from "./ProfilePic";
import { Search, KeyboardBackspace } from "@material-ui/icons";
import "./Topbar.scss";
import SearchDrawer from "./SearchDrawer";
import Context from "./Context";

export default function Topbar() {
  const ctx = useContext(Context);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function submitSearch(keyword) {
    console.log("submitSearch", keyword);
    ctx.setSearching(keyword);
    setSearchOpen(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.target.blur();
      submitSearch(search);
    }
  }

  return (
    <AppBar position="sticky" color="default" className="Topbar">
      <Toolbar>
        {searchOpen ? (
          <IconButton onClick={() => setSearchOpen(false)}>
            <KeyboardBackspace />
          </IconButton>
        ) : (
          <img
            src="https://dcassetcdn.com/design_img/3592548/634077/634077_19781096_3592548_8b26ba35_image.jpg"
            height={40}
          />
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
      <TopbarDrawer open={open} setOpen={setOpen} />
    </AppBar>
  );
}
