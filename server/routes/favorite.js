const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//           Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
   Favorite.find({ movieId: req.body.movieId }).exec((err, results) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, favoriteNum: results.length });
   });
});

router.post("/favorited", (req, res) => {
   Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, results) => {
      if (err) return res.status(400).send(err);
      let favorited = false;
      if (results.length !== 0) favorited = true;

      res.status(200).json({ success: true, favorited });
   });
});

router.post("/favorited", (req, res) => {
   Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, results) => {
      if (err) return res.status(400).send(err);
      let favorited = false;
      if (results.length !== 0) favorited = true;

      res.status(200).json({ success: true, favorited });
   });
});

router.post("/favorite", (req, res) => {
   const favorite = new Favorite(req.body);
   favorite.save((err, result) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true });
   });
});

router.post("/unfavorite", (req, res) => {
   Favorite.findOneAndDelete(req.body).exec((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
   });
});

module.exports = router;
