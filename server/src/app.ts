import express, { Request, Response } from "express";

const app = express();

// Simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from App.ts!🚀");
});

// Example additional route
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "This is a test route!" });
});

export default app;
