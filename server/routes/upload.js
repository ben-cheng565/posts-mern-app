import express from "express";
import multer from "multer";

const router = express.Router();

let filePath = "";
//set the destination folder
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    filePath = Date.now() + "-" + file.originalname;
    cb(null, filePath);
  },
});
//Create an upload instance and receive a single file
const upload = multer({ storage: storage }).single("file"); //single or array

router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json({ filePath });
  });
});

export default router;
