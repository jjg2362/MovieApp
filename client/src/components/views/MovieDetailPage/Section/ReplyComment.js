import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
   const [CommentNumber, setCommentNumber] = useState(0);
   const [OpenReply, setOpenReply] = useState(false);

   useEffect(() => {
      let commentCount = 0;
      props.comments.map(comment => {
         if (props.parentCommentId === comment.responseTo) {
            commentCount++;
         }
         setCommentNumber(commentCount);
      });
   }, [props.comments]);

   const openReply = () => {
      setOpenReply(!OpenReply);
   };

   const renderCommentList = props.comments.map((comment, index) => (
      <React.Fragment key={index}>
         {props.parentCommentId === comment.responseTo && (
            <div style={{ width: "85%", marginLeft: "40px" }}>
               <SingleComment comment={comment} userId={props.userId} movieId={props.movieId} refreshFunc={props.refreshFunc} />
               <ReplyComment comments={props.comments} userId={props.userId} movieId={props.movieId} refreshFunc={props.refreshFunc} parentCommentId={comment._id} />
            </div>
         )}
      </React.Fragment>
   ));

   return (
      <div>
         {CommentNumber > 0 && (
            <p style={{ color: "gray", cursor: "pointer" }} onClick={openReply}>
               View {CommentNumber} more comment(s)
            </p>
         )}
         {/* Comment Lists */}
         {OpenReply && renderCommentList}
      </div>
   );
}

export default ReplyComment;
