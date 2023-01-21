import React from "react";
import {Answer} from "./index";

const AnswersList = (props) => {
  return (
    <div className="c-grid__answer">
      <Answer content={"answer1"} />
      <Answer content={"answer2"} />
      <Answer content={"answer3"} />
      <Answer content={"answer4"} />
    </div>
  );
};

export default AnswersList;
