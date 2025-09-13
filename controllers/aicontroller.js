const expressAsyncHandler = require("express-async-handler");
const axios = require("axios");
require("dotenv").config();
const base_url = process.env.AI_BASE_URL;
const mediapipe = expressAsyncHandler(async (req, res) => {
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).json({ error: "No video file uploaded" });
  }
  const FormData = require("form-data");
  const form = new FormData();
  form.append("video", videoFile.buffer, {
    filename: videoFile.originalname,
    contentType: videoFile.mimetype,
  });
  // Send to another API (replace with your target URL)
  const response = await axios.post(`${base_url}/analyze_player`, form, {
    headers: {
      ...form.getHeaders(),
    },
  });
  res
    .status(200)
    .json({ message: "Video uploaded successfully", response: response.data });
});
const download_ai_video = expressAsyncHandler(async (req, res) => {
  const video_url = req.params.video_id;

  const response = await axios.get(
    `${base_url}/download_analysis/${video_url}`,
    {
      responseType: "stream", // Important: get response as stream
    }
  );

  // 2. Set appropriate headers
  res.setHeader(
    "Content-Type",
    response.headers["content-type"] || "video/mp4"
  );
  res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

  // 3. Pipe the video stream from the response to the client
  response.data.pipe(res);
});
module.exports = {
  mediapipe,
  download_ai_video,
};
