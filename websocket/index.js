const WebSocket = require("ws");
const business1 = require("./business1");
const business2 = require("./business2");

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 4001 });

  wss.on("listening", () => {
    console.log("WebSocket 服务器已启动");
  });

  wss.on("connection", function connection(ws, req) {
    const url = new URL(req.url, "http://localhost");
    const path = url.pathname;

    switch (path) {
      case "/business1":
        ws.on("message", function incoming(message) {
          business1.call(ws, message);
        });

        ws.on("close", function close() {
          console.log("business1 连接已关闭");
        });

        break;
      case "/business2":
        ws.on("message", function incoming(message) {
          business2(message);
        });

        ws.on("close", function close() {
          console.log("business2 连接已关闭");
        });
        break;
      default:
        // 未知路径，可以进行相应的处理...
        console.log("未知路径连接已建立");
        break;
    }
  });
}

module.exports = startWebSocketServer;
