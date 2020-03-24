const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
   {
      writer: {
         type: Schema.Types.ObjectId,
         ref: "User"
      },
      responseTo: {
         type: Schema.Types.ObjectId,
         ref: "User"
      },
      movieId: {
         type: String
      },
      content: {
         type: String
      }
   },
   { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
