import React, { useState } from "react";
import { Comment, Avatar, Button, Input, Form } from "antd";
import Axios from "axios";

const { TextArea } = Input;

function SingleComment(props) {
   const [OpenReply, setOpenReply] = useState(false);
   const [CommentValue, setCommentValue] = useState("");

   const handleCommentValueChange = e => {
      setCommentValue(e.currentTarget.value);
   };

   const onComment = () => {
      let variables = {
         writer: props.userId,
         responseTo: props.comment._id,
         movieId: props.movieId,
         content: CommentValue
      };
      Axios.post("/api/comment/saveComment", variables).then(response => {
         if (response.data.success) {
            props.refreshFunc(response.data.result);
            setCommentValue("");
            openReply(false);
         } else {
            alert("Failed to save comment");
         }
      });
   };

   const openReply = () => {
      setOpenReply(!OpenReply);
   };

   const actions = [
      <span onClick={openReply} key="comment-basic-reply-to">
         Reply to{" "}
      </span>
   ];

   return (
      <div>
         <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} title={props.comment.writer.name} />}
            content={<p>{props.comment.content}</p>}
         />
         {OpenReply && (
            <Form style={{ display: "flex" }} onSubmit={onComment}>
               <TextArea style={{ width: "100%", borderRadius: "5px" }} onChange={handleCommentValueChange} value={CommentValue} placeholder="write your comment" />
               <Button style={{ width: "20%", height: "52px" }} onClick={onComment}>
                  Submit
               </Button>
            </Form>
         )}
      </div>
   );
}

export default SingleComment;
