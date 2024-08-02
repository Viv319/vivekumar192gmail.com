const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const folderRoutes = require("./routes/folder");
const popupRoutes = require("./routes/popup");
const shareRoutes = require("./routes/share");
const statsRoutes = require("./routes/stats");

const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://vivekumar192-gmail-com-client.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello and Welcome!");
});

app.get("/health", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/folder", folderRoutes);
app.use("/api/v1/popup", popupRoutes);
app.use("/api/v1/share", shareRoutes);
app.use("/api/v1/stats", statsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    errorMessage: error.message,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((error) => {
    console.log("DB failed to connect", error);
  });
const PORT = 3001;

app.listen(PORT, () => {
  console.log(` Backend server running at port : ${PORT}`);
});
