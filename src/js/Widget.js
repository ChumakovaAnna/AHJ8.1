/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.container = document.querySelector(".widget");
    this.chat = document.querySelector(".chat");
    this.registration = document.querySelector(".registration");
    this.usersList = document.querySelector(".users_list");
    this.error = document.querySelector(".popover");
  }

  renderUsersList(users, name) {
    this.closeRegistration();
    this.usersList.classList.remove("hidden");
    const ul = this.usersList.querySelector("ul");
    users.forEach((ele) => {
      if (ele === name) {
        ul.innerHTML += "<li class=\"valid\">YOU</li>";
      } else {
        ul.innerHTML += `<li class="">${ele}</li>`;
      }
    });
  }

  changeName() {
    this.loginLabel.style.color = "red";
    this.loginInput.classList.add("invalid");
    this.loginLabel.innerHTML = "Select another name";
  }

  nameIsOk() {
    this.loginDiv.classList.add("hidden");
    this.loginLabel.style.color = "inherit";
    this.loginInput.classList.remove("invalid");
    this.loginLabel.innerHTML = "Enter your name";
  }

  renderError(text) {
    if (this.error.classList.contains("hidden")) {
      this.error.classList.remove("hidden");
    }
    this.error.innerHTML = `
    <p>${text}</p>
    `;
  }

  renderChat(messages, user) {
    this.chat.classList.remove("hidden");
    const messagesList = this.chat.querySelector(".conversations");
    messagesList.innerHTML = "";
    messages.forEach((ele) => {
      if (ele.user === user) {
        messagesList.innerHTML += `
        <div class="message you">
        <span>YOU, ${ele.date}</span>
        ${ele.message}
        </div>
        `;
      } else {
        messagesList.innerHTML += `
        <div class="message">
        <span>${user}, ${ele.date}</span>
        ${ele.message}
        </div>
        `;
      }
    });
  }

  closeError() {
    if (!this.error.classList.contains("hidden")) {
      this.error.classList.add("hidden");
    }
  }

  closeRegistration() {
    if (!this.registration.classList.contains("hidden")) {
      this.registration.classList.add("hidden");
    }
  }
}
