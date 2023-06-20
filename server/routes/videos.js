import express from "express";
import { addVideo, addView, getVideo, randomVideo, subVideo, trendVideo, deleteVideo, updateVideo, getByTagsVideo, searchVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//get video
router.get("/find/:id", verifyToken, getVideo);
//delete video
router.delete("/:id", verifyToken, deleteVideo);
//add video
router.post("/", verifyToken, addVideo);
//update video
router.put("/:id", verifyToken, updateVideo);

router.put("/view/:id", addView);

router.get("/trend", trendVideo);

router.get("/random", randomVideo);

router.get("/sub", verifyToken, subVideo);

router.get("/tags", getByTagsVideo);
router.get("/search", searchVideo);



export default router;