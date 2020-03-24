import React, { useState, useEffect } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDislike(props) {
   const [LikeNumber, setLikeNumber] = useState(0);
   const [Liked, setLiked] = useState(false);
   const [DislikeNumber, setDislikeNumber] = useState(0);
   const [Disliked, setDisliked] = useState(false);

   let variables = {};
   if (props.movie) variables = { userId: props.userId, movieId: props.movieId };
   else variables = { userId: props.userId, commentId: props.commentId };

   useEffect(() => {
      Axios.post("/api/like/getLikes", variables).then(response => {
         if (response.data.success) {
            setLikeNumber(response.data.likeNumber);
            response.data.likes.map((like, index) => {
               if (like.userId === props.userId) setLiked(true);
            });
         } else {
            alert("Failed to get like information");
         }
      });

      Axios.post("/api/like/getDislikes", variables).then(response => {
         if (response.data.success) {
            setDislikeNumber(response.data.dislikeNumber);
            response.data.dislikes.map((dislike, index) => {
               if (dislike.userId === props.userId) setDisliked(true);
            });
         } else {
            alert("Failed to get dislike information");
         }
      });
   }, []);

   const onLike = () => {
      if (Liked) {
         Axios.post("/api/like/unLike", variables).then(response => {
            if (response.data.success) {
               setLiked(!Liked);
               setLikeNumber(LikeNumber - 1);
            } else {
               alert("Failed to unlike");
            }
         });
      } else {
         Axios.post("/api/like/upLike", variables).then(response => {
            if (response.data.success) {
               setLiked(!Liked);
               setLikeNumber(LikeNumber + 1);

               if (Disliked) {
                  setDisliked(!Disliked);
                  setDislikeNumber(DislikeNumber - 1);
               }
            } else {
               alert("Failed to uplike");
            }
         });
      }
   };

   const onDislike = () => {
      if (Disliked) {
         Axios.post("/api/like/unDislike", variables).then(response => {
            if (response.data.success) {
               setDisliked(!Disliked);
               setDislikeNumber(DislikeNumber - 1);
            } else {
               alert("Failed to undislike");
            }
         });
      } else {
         Axios.post("/api/like/upDislike", variables).then(response => {
            if (response.data.success) {
               setDisliked(!Disliked);
               setDislikeNumber(DislikeNumber + 1);

               if (Liked) {
                  setLiked(!Liked);
                  setLikeNumber(LikeNumber - 1);
               }
            } else {
               alert("Failed to updislike");
            }
         });
      }
   };

   return (
      <div>
         <React.Fragment>
            <span key="comment-basic-like">
               <Tooltip title="Like">
                  <Icon type="like" theme={Liked ? "filled" : "outlined"} onClick={onLike} />
               </Tooltip>
               <span style={{ paddingLeft: "8px", cursor: "auto" }}>{LikeNumber}</span>
            </span>
            &nbsp;&nbsp;
            <span key="comment-basic-dislike">
               <Tooltip title="Dislike">
                  <Icon type="dislike" theme={Disliked ? "filled" : "outlined"} onClick={onDislike} />
               </Tooltip>
               <span style={{ paddingLeft: "8px", cursor: "auto" }}>{DislikeNumber}</span>
            </span>
         </React.Fragment>
      </div>
   );
}

export default LikeDislike;
