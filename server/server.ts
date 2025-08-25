import { createServer } from "http";

const httpServer = createServer((req, res) => {
  res.end("Hello World");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
