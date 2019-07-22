import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Explore, Message, Home, CalendarToday } from "@material-ui/icons";

function BottomNav({ value, onChange }) {
  return (
    <BottomNavigation value={value} onChange={onChange} showLabels>
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Explore" icon={<Explore />} />
      <BottomNavigationAction label="Events" icon={<CalendarToday />} />
      <BottomNavigationAction label="Messages" icon={<Message />} />
    </BottomNavigation>
  );
}

export default BottomNav;
