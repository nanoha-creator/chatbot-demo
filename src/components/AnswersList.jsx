import React from "react";
import { Answer } from "./index";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const c_grid__answer = css`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  height: 192px;
`

const AnswersList = (props) => {
  return (
    <div css={c_grid__answer}>
      {props.answers.map((value, index) => {
        return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select}/>;
      })}
    </div>
  );
};

export default AnswersList
