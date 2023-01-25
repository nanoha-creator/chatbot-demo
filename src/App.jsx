import React, { useState, useEffect, useCallback } from "react";
import { AnswersList, Chats } from "./Components/index";
import FormDialog from "./Components/Forms/FormDialog";
import "./Assets/styles/style.css";
import { db } from "./Firebase/index";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question",
    });

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;

      case nextQuestionId === "contact":
        handleClickOpen();
        break;

      default:
        addChats({
          text: selectedAnswer,
          type: "answer",
        });

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  };

  const addChats = (chat) => {
    setChats((prevChats) => {
      return [...prevChats, chat];
    });
  };

  // お問い合わせモーダルを開状態にする
  const handleClickOpen = () => {
    setOpen(true);
  };

  // お問い合わせモーダルを閉状態にする
  const handleClose = useCallback(() => {
    setOpen(false)}, [setOpen]);

  useEffect(() => {
    // 初期化後、データをセット（非同期）
    (async () => {
      const initDataset = {};
      await db
        .collection("questions")
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            initDataset[id] = data;
          });
        });
      setDataset(initDataset);

      // ステートの反映に時間がかかるため、ステート経由せずに最初のチャットを表示させる
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);

  useEffect(() => {
    // 最新のチャットが見えるように、スクロール位置を一番下に下げる
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default App;
