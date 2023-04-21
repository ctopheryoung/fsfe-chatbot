const responseOutput = document.querySelector(".response-output");
const input = document.querySelector(".message-input");

input.addEventListener("keyup", (e) => {
  if (e.key !== "Enter" || e.target.value === "") {
    return;
  }

  ws.send(e.target.value);
  e.target.value = "";
});

const wssUrl = ["localhost", "127.0.0.1", ""].includes(location.hostname)
  ? "ws://localhost:3001"
  : "wss://api.chrisyoung.tech";

const ws = new WebSocket(wssUrl);

ws.onmessage = ({ data }) => {
  console.log(`Received response from server: ${JSON.stringify(data)}`);

  const el = document.createElement("div");
  el.innerHTML = `Chatbot: ${data}`;
  responseOutput.prepend(el);
};
