const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");
const authenticate = require("../middleware/authenticate");

router.get("/:id", commentController.getComments);
router.post("/", commentController.createComment);
router.delete("/:id", authenticate, commentController.deleteComment);
router.put("/:id", authenticate, commentController.updateComment);

module.exports = router;