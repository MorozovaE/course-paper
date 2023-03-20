import express from "express";
import cors from "cors"

import { config } from "../config.js";
import { taskRouter } from "./routes/task-route.js";
import { priorityRouter } from "./routes/priority-route.js";
import { listRouter } from "./routes/list-route.js";

export const app = express();

// app settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: config.app.clientHost
}));

// test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// routes
app.use("/tasks", taskRouter);
app.use("/priorities", priorityRouter);
app.use("/lists", listRouter);


// app running
function onStart() {
  // logger(`Server running on port ${AppConfig.port}`);
  console.log(`Server running on port ${config.app.port}`);
}

app.listen(config.app.port, onStart);
