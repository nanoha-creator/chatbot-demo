import React from "react";
import { styled } from '@mui/system';
import List from "@mui/material/List";
import {Chat} from "./index";

const CustomList = styled(List)({
  height: 400,
  padding: 0,
  overflow: 'auto'
})

const Chats = (props) => {
  return (
    <CustomList sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={index.toString()}/>
      })}
    </CustomList>
  )
};

export default Chats;
