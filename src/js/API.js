export default class API {
  constructor(widget) {
    // this.url = "ws://localhost:7070";
    this.url = "wss://ahj8-2.herokuapp.com/ws";
    this.widget = widget;
    this.user = null;
    this.response = null;
  }

  init() {
    this.wsConnect();
    this.widget.container.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const { target } = evt;

      if (target.classList.contains("registration__form")) {
        const loginInput = target.querySelector(".registration__input");
        const name = loginInput.value;
        this.sendName(name);
        loginInput.value = "";
      }

      if (target.classList.contains("form_new_message")) {
        const messageInput = target.querySelector(".new_message");
        const text = messageInput.value;
        this.sendMessage(text);
        messageInput.value = "";
      }
    });

    document.addEventListener("click", () => {
      this.widget.closeError();
    });
  }

  sendName(value) {
    this.user = value;
    const request = {
      type: "login",
      value: this.user,
    };
    this.ws.send(JSON.stringify(request));
  }

  sendMessage(text) {
    const request = {
      type: "newMessage",
      value: text,
      user: this.user,
    };
    this.ws.send(JSON.stringify(request));
  }

  wsConnect() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = "blob";

    this.ws.addEventListener("open", () => {
      console.log("connected people");
    });

    this.ws.addEventListener("close", (evt) => {
      console.log("server close", evt);
    });

    this.ws.addEventListener("message", (evt) => {
      this.response = null;
      if (this.ws.readyState === WebSocket.OPEN) {
        this.response = JSON.parse(evt.data);
        console.log(this.response);
        if (this.response.type === "users") {
          this.widget.renderUsersList(this.response.users, this.user);
        }
        if (this.response.type === "messages") {
          this.widget.renderChat(this.response.messages, this.user);
        }

        if (this.response.type === "error") {
          this.widget.renderError(this.response.text);
        }
      } else {
        console.log(evt.code);
      }
    });

    this.ws.addEventListener("error", (error) => {
      console.log(error);
    });
  }

  getResponse() {
    return this.response;
  }
}
