const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const folderRoutes = require("./routes/folder");
const formRoutes = require("./routes/form");
// const popupRoutes = require("./routes/popup");
const popupRoutes = require("./routes/popup");

// const popupRoutes2 = require("./routes/popup");

const cors = require("cors");
require("dotenv").config();
const app = express();
// this will let know that you should expect some objects
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // your frontend's URL
  credentials: true, // Allow credentials
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello and Welcome!");
});

app.get("/health", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/folder", folderRoutes);
app.use("/api/v1/form", formRoutes);
// app.use("/api/v1/popup", popupRoutes);
app.use("/api/v1/popup", popupRoutes);

// app.use("/api", popupRoutes2);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    errorMessage: error.message,
    // change errorMessage to something went wrong
    // when development is complete
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
