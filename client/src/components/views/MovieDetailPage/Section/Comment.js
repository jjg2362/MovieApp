import React, { useState, useEffect } from "react";
import { Button, Input, Form } from "antd";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

function Comment(props) {
   const [CommentValue, setCommentValue] = useState("");

   const handleCommentValueChange = e => {
      setCommentValue(e.currentTarget.value);
   };

   const onComment = () => {
      let variables = {
         writer: props.userId,
         movieId: props.movieId,
         content: CommentValue
      };
      Axios.post("/api/comment/saveComment", variables).then(response => {
         if (response.data.success) {
            props.refreshFunc(response.data.result);
            setCommentValue("");
         } else {
            alert("Failed to save comment");
         }
      });
   };

   return (
      <div>
         {/* Comment Lists */}
         {props.comments &&
            props.comments.map(
               comment =>
                  !comment.responseTo && (
                     <React.Fragment>
                        <SingleComment comment={comment} userId={props.userId} movieId={props.movieId} refreshFunc={props.refreshFunc} />
                        <ReplyComment comments={props.comments} userId={props.userId} movieId={props.movieId} refreshFunc={props.refreshFunc} parentCommentId={comment._id} />
                     </React.Fragment>
                  )
            )}

         <Form style={{ display: "flex" }} onSubmit={onComment}>
            <TextArea style={{ width: "100%", borderRadius: "5px" }} onChange={handleCommentValueChange} value={CommentValue} placeholder="write your comments"></TextArea>
            <Button style={{ width: "20%", height: "60px" }} onClick={onComment}>
               Submit
            </Button>
         </Form>
      </div>
   );
}

export default Comment;
