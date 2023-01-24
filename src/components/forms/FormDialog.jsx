import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextInput from "./TextInput";
import { WEBHOOK_URL } from "../../webhookConfig";

const FormDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // テキストフィールドに変更があったら、ステートを更新
  const inputName = useCallback((event) => {
    setName(event.target.value)}, [setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)}, [setEmail]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)}, [setDescription]);

  // メールアドレス形式に沿っているか確認
  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  // 空でないか確認
  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };

  // Slackにお問い合わせ通知をする
  const submitForm = () => {
    // バリデーションチェック
    if (validateRequiredInput(name, email, description)) {
      alert("必須入力欄が空白です");
      return false;
    } else if (!validateEmailFormat(email)) {
      alert("メールアドレスの書式が異なります");
      return false;
    } else {
      // Slackに通知
      const payload = {
        text:
          "お問い合わせがありました\n" +
          "お名前：" +
          name +
          "\n" +
          "Email：" +
          email +
          "\n" +
          "お問い合わせ内容：\n" +
          description,
      };

      fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(() => {
        alert("送信が完了しました");
        // ステートを初期化
        setName("");
        setEmail("");
        setDescription("");

        return props.handleClose();
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前（必須）"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          label={"メールアドレス（必須）"}
          multiline={false}
          rows={1}
          value={email}
          type={"text"}
          onChange={inputEmail}
        />
        <TextInput
          label={"お問い合わせ内容（必須）"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button onClick={submitForm} autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
