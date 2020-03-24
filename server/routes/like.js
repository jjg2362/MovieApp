const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//           Like
//=================================

router.post("/getLikes", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   Like.find(variables).exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes, likeNumber: likes.length });
   });
});

router.post("/getDislikes", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   Dislike.find(variables).exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes, dislikeNumber: dislikes.length });
   });
});

router.post("/upLike", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   const like = new Like(variables);
   like.save((err, result) => {
      if (err) return res.status(400).send(err);

      Dislike.findOneAndDelete(variables).exec((err, doc) => {
         if (err) return res.status(400).send(err);
         res.status(200).json({ success: true });
      });
   });
});

router.post("/upDislike", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   const dislike = new Dislike(variables);
   dislike.save((err, result) => {
      if (err) return res.status(400).send(err);

      Like.findOneAndDelete(variables).exec((err, doc) => {
         if (err) return res.status(400).send(err);
         res.status(200).json({ success: true });
      });
   });
});

router.post("/unLike", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   Like.findOneAndDelete(variables).exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
   });
});

router.post("/unDislike", (req, res) => {
   let variables = {};
   if (req.body.movieId) variables = { movieId: req.body.movieId, userId: req.body.userId };
   else variables = { commentId: req.body.commentId, userId: req.body.userId };

   Dislike.findOneAndDelete(variables).exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
   });
});

module.exports = router;
