const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//            Comment
//=================================

router.post("/saveComment", (req, res) => {
   const comment = Comment(req.body);
   comment.save((err, comment) => {
      if (err) return res.status(400).send(err);

      Comment.find({ _id: comment._id })
         .populate("writer")
         .exec((err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, result });
         });
   });
});

router.post("/getComments", (req, res) => {
   Comment.find(req.body)
      .populate("writer")
      .exec((err, comments) => {
         if (err) return res.status(400).send(err);
         return res.status(200).json({ success: true, comments });
      });
});

router.post("/getCommentNumber", (req, res) => {
   Comment.find(req.body).exec((err, comments) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, commentNumber: comments.length });
   });
});

module.exports = router;
