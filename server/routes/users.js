import express from "express";
import { deleteUser, disLike, getUser, like, subscribeUser, unSubscribe, updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//get user
router.get("/find/:id", getUser);
//update
router.put("/:id", verifyToken, updateUser);
//delete
router.delete("/:id", verifyToken, deleteUser);
//subscribe
router.put("/sub/:id", verifyToken, subscribeUser);
//unSubscribe
router.put("/unsub/:id", verifyToken, unSubscribe);
//like
router.put("/like/:videoId", verifyToken, like);
//dislike
router.put("/dislike/:videoId", verifyToken, disLike);
export default router;