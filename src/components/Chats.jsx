import React from "react";
import List from "@mui/material/List";
import {Chat} from "./index";

const Chats = (props) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={index.toString()}/>
      })}
    </List>
  )
};

export default Chats;
