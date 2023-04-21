import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 3001;

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile("ui/index.html");
});

// Serve JS
app.use("/js", express.static("ui/js"));

const server = app.listen(port, () => {
  console.log(`Chatbot app listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log(`Received message from client: ${data}`);
    ws.send("Great!");
  });

  ws.send("Hello!");
});
