import React, { useState, useContext, useEffect } from "react";
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
import { apiUrl } from "../utils/data";
import subscribePushNotifcations from "../utils/subscribePushNotifications";

export default function Main({ history }) {
  const [page, setPage] = useState(0);
  const [listings, setListings] = useState([]);
  const { searching, setSearching, user, setUser } = useContext(Context);

  function getPage() {
    switch (page) {
      case 0:
        return <Home listings={listings} />;
      case 1:
        return <Explore listings={listings} user={user} />;
      case 2:
        return <Events />;
      case 3:
        return (
          <Messages
            conversations={user.conversations}
            onChange={handleUpdateMessages}
            userId={user.id}
            refreshConversations={refreshConversations}
          />
        );
      default:
        return new Error("Unknown page");
    }
  }

  useEffect(() => {
    if (user.id) {
      getListings();
      subscribePushNotifcations(user.id);
    }
  }, []);

  function getListings() {
    fetch(`${apiUrl}/listing`)
      .then(res => res.json())
      .then(listings => setListings(listings))
      .catch(e => console.log(e));
  }

  function handlePageChange(e, value) {
    if (searching) {
      setSearching(false);
    }
    setPage(value);
  }

  function refreshConversations() {
    fetch(`${apiUrl}/conversation?id=${user.id}`)
      .then(res => res.json())
      .then(result => {
        const newUser = { ...user };
        newUser.conversations = result;
        setUser(newUser);
      });
  }

  function handleUpdateMessages(newMessage) {
    const newUser = { ...user };
    const index = newUser.conversations.findIndex(
      conversation => conversation._id === newMessage._id
    );

    newUser.conversations[index].messages = [
      ...newUser.conversations[index].messages,
      { ...newMessage }
    ];

    fetch(`${apiUrl}/conversation/${newMessage._id}`, {
      method: "PUT",
      body: JSON.stringify(newUser.conversations[index]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => setUser(newUser));
  }

  function handleNewConversation(userInfo) {
    if (searching) {
      setSearching(false);
    }

    setPage(3);
    history.push("/");

    const conversationExist = user.conversations.find(
      conversation =>
        conversation.sender.id === userInfo.id || conversation.receiver.id === userInfo.id
    );

    if (!conversationExist) {
      const newDate = format(new Date(), "YYYY-MM-DD HH:mm");

      const newConversation = {
        receiver: userInfo,
        sender: {
          id: user.id,
          img: user.img,
          name: user.name
        },
        messages: [],
        created: newDate,
        last_active: newDate
      };

      fetch(`${apiUrl}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newConversation)
      })
        .then(res => res.json())
        .then(({ insertId }) => {
          newConversation._id = insertId;
          newConversation.id = insertId;
          setUser({ ...user, conversations: [...user.conversations, newConversation] });
        });
    }
  }

  return (
    <Grid container direction="column" style={{ height: "100vh" }}>
      <Topbar getListings={getListings} />
      <div className="main-container">
        {searching ? <Search listings={listings} searching={searching} /> : getPage()}
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
