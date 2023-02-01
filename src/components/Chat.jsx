import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import NoProfile from "../Assets/img/no-profile.png";
import Torahack from "../Assets/img/profile.jpeg";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Chat = (props) => {
  const isQuestion = props.type === "question";
  const classes = isQuestion ? p_chat__row : p_chat__reverse;

  return (
    <ListItem css={classes}>
      <ListItemAvatar>
        {isQuestion ? <Avatar alt="icon" src={Torahack} /> : <Avatar alt="icon" src={NoProfile} />}
      </ListItemAvatar>
      <div css={p_chat__bubble}>{props.text}</div>
    </ListItem>
  );
};

export default Chat;

const p_chat__bubble = css`
  background: #41b6e6;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem;
  margin-right: 1rem;
  max-width: 80%;
  width: auto;
  white-space: pre-wrap;
`

const p_chat__row = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-right: 0 !important;
`

const p_chat__reverse = css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  padding-right: 0 !important;
`
