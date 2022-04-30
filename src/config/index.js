const urls = new Map();
const webSocketUrls = new Map();

urls.set("localhost", "http://localhost:5000");
urls.set(
  "poll-react.herokuapp.com",
  "https://poll-fastify-server.herokuapp.com"
);
webSocketUrls.set("localhost", "ws://localhost:5000");
webSocketUrls.set(
  "poll-react.herokuapp.com",
  "wss://poll-fastify-server.herokuapp.com"
);

export const baseUrl = urls.get(window.location.hostname);
export const webSocketUrl = webSocketUrls.get(window.location.hostname);
