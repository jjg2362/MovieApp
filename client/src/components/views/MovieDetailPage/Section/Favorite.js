import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";

function Favorite(props) {
   const userFrom = props.userId;
   const movieId = props.movieId;
   const movieTitle = props.movieInfo.title;
   const movieRuntile = props.movieInfo.runtime;

   const [FavoriteNumber, setFavoriteNumber] = useState(0);
   const [Favorited, setFavortited] = useState(false);

   useEffect(() => {
      let variables = {
         userFrom: userFrom,
         movieId: movieId
      };
      Axios.post("/api/favorite/favoriteNumber", variables).then(response => {
         if (response.data.success) {
            console.log(response.data);
         } else {
            alert("Failed to get favorite number");
         }
      });
   }, []);

   return (
      <div>
         <Button onClick>Favorite</Button>
      </div>
   );
}

export default Favorite;
