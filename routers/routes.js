const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv").config();

const upload = multer();
base_url = process.env.AI_BASE_URL;
const { register, login } = require("../controllers/authcontrollers");
const { mediapipe, download_ai_video } = require("../controllers/aicontroller");
const { see_all_candidates } = require("../controllers/admincontroller");
router.post("/register", register);
router.post("/login", login);
router.post(`/analyze`, upload.single("video"), mediapipe);
router.get("/download_analysis/:video_id", download_ai_video);
router.get("/get_players", see_all_candidates);
module.exports = {
  router,
};
