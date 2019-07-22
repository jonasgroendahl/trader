import React, { useState, useContext } from "react";
import Explore from "../navigationPages/Explore";
import BottomNav from "../components/BottomNavigation";
import Topbar from "../components/Topbar";
import Context from "../components/Context";
import { Grid } from "@material-ui/core";
import Search from "../navigationPages/Search";
import Messages from "../navigationPages/Messages";
import { Redirect, Route } from "react-router-dom";
import Listing from "./Listing";
import Home from "../navigationPages/Home";
import Events from "../navigationPages/Events";
import { format } from "date-fns";

export default function Main({ history }) {
  const [page, setPage] = useState(0);
  const { searching, setSearching, user, setUser } = useContext(Context);

  function getPage() {
    switch (page) {
      case 0:
        return <Home />;
      case 1:
        return <Explore />;
      case 2:
        return <Events />;
      case 3:
        return <Messages conversations={user.conversations} onChange={handleUpdateMessages} />;
      default:
        return new Error("Unknown page");
    }
  }

  function handlePageChange(e, value) {
    if (searching) {
      setSearching(false);
    }
    setPage(value);
  }

  function handleUpdateMessages(newMessage) {
    const newUser = { ...user };
    const index = newUser.conversations.findIndex(
      conversation => conversation.id === newMessage.id
    );

    newUser.conversations[index].messages = [
      ...newUser.conversations[index].messages,
      { ...newMessage }
    ];

    console.log(newUser);

    setUser(newUser);
  }

  function handleNewConversation(userInfo) {
    setPage(3);
    history.push("/");

    if (!user.conversations.find(conversation => conversation.id === userInfo.id)) {
      const newDate = format(new Date(), "YYYY-MM-DD HH:mm");

      const newConversation = {
        ...userInfo,
        messages: [],
        created: newDate,
        last_active: newDate,
        id: Math.floor(Math.random() * Math.floor(1000)),
        sender: user.id
      };

      console.log("new", newConversation, user.conversations);

      setUser({ ...user, conversations: [...user.conversations, newConversation] });
    }
  }

  return (
    <Grid container direction="column" style={{ height: "100vh" }}>
      <Topbar />
      <div className="main-container">
        {searching ? <Search searching={searching} /> : getPage()}
      </div>
      <div style={{ flexGrow: 1 }} />
      <BottomNav value={page} onChange={handlePageChange} />
      {!user.id && <Redirect to="/login" />}
      <Route
        path="/listing/:id"
        component={props => <Listing onMessage={handleNewConversation} {...props} />}
      />
    </Grid>
  );
}
