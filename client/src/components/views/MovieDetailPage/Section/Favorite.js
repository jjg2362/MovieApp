import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";

function Favorite(props) {
   const userFrom = props.userFrom;
   const movieId = props.movieId;
   const movieTitle = props.movieInfo.title;
   const movieRuntile = props.movieInfo.runtime;

   const [FavoriteNumber, setFavoriteNumber] = useState(0);
   const [Favorited, setFavortited] = useState(false);

   let variables = {
      userFrom: userFrom,
      movieId: movieId
   };
   useEffect(() => {
      Axios.post("/api/favorite/favoriteNumber", variables).then(response => {
         if (response.data.success) {
            setFavoriteNumber(response.data.favoriteNum);
         } else {
            alert("Failed to get favorite number");
         }
      });

      Axios.post("/api/favorite/favorited", variables).then(response => {
         if (response.data.success) {
            setFavortited(response.data.favorited);
         } else {
            alert("Failed to get being favorited");
         }
      });
   }, []);

   const onFavorite = () => {
      if (Favorited) {
         Axios.post("/api/favorite/unfavorite", variables).then(response => {
            if (response.data.success) {
               setFavoriteNumber(FavoriteNumber - 1);
               setFavortited(!Favorited);
            } else {
               alert("Failed to favorite");
            }
         });
      } else {
         Axios.post("/api/favorite/favorite", variables).then(response => {
            if (response.data.success) {
               setFavoriteNumber(FavoriteNumber + 1);
               setFavortited(!Favorited);
            } else {
               alert("Failed to favorite");
            }
         });
      }
   };

   return (
      <div>
         <Button onClick={onFavorite} type={Favorited ? "ghost" : "primary"}>
            {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
         </Button>
      </div>
   );
}

export default Favorite;
