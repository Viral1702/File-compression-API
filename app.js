const express = require("express");
const app = express();
const sendToQueue = require("./send");
const compressPDF = require("./worker");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); // unique file name
  },
});

const upload = multer({ storage });

app.post("/", upload.array("files", 10), async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  files.forEach((file) => {
    const filePath = path.join(__dirname, "uploads", file.filename);
    sendToQueue(filePath);
  });

  res.send("All files sent to compression queue.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
  compressPDF(); // Start consumer
});
