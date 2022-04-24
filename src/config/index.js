const urls = new Map();
const webSocketUrls = new Map();

urls.set("localhost", "http://localhost:5000");
webSocketUrls.set("localhost", "ws://localhost:5000");

export const baseUrl = urls.get(window.location.hostname);
export const webSocketUrl = webSocketUrls.get(window.location.hostname);
