import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextInput from "./TextInput";
import {WEBHOOK_URL} from '../../webhookConfig'

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    }

    // バインド
    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
  }

  // テキストフィールドに変更があったら、ステートを更新
  inputName = (event) => {
    this.setState({ name: event.target.value });
  };

  inputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  inputDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  // メールアドレス形式に沿っているか確認
  validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  // 空でないか確認
  validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };

  // Slackにお問い合わせ通知をする
  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

    // バリデーションチェック
    if (this.validateRequiredInput(name, email, description)) {
      alert("必須入力欄が空白です");
      return false;
    } else if (!this.validateEmailFormat(email)) {
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


      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(() => {
        alert("送信が完了しました");
        // ステートを初期化
        this.setState({
          name: "",
          email: "",
          description: "",
        });
        return this.props.handleClose();
      });
    }
  };

  render(props) {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前（必須）"}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={"text"}
            onChange={this.inputName}
          />
          <TextInput
            label={"メールアドレス（必須）"}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={"text"}
            onChange={this.inputEmail}
          />
          <TextInput
            label={"お問い合わせ内容（必須）"}
            multiline={true}
            rows={5}
            value={this.state.description}
            type={"text"}
            onChange={this.inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>キャンセル</Button>
          <Button onClick={this.submitForm} autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}