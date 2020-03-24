import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";
import "./FavoritePage.css";
import Axios from "axios";

function FavoritePage() {
   const [FavoriteMovies, setFavoriteMovies] = useState([]);

   useEffect(() => {
      refreshFavorite();
   }, []);

   const refreshFavorite = () => {
      Axios.post("/api/favorite/getFavoriteMovies", { userFrom: localStorage.getItem("userId") }).then(response => {
         if (response.data.success) {
            setFavoriteMovies(response.data.results);
         } else {
            alert("Failed to get favorite movies");
         }
      });
   };

   const removeFavoriteButton = (userFrom, movieId) => {
      let variables = { userFrom: userFrom, movieId: movieId };
      Axios.post("/api/favorite/removeFromFravorite", variables).then(response => {
         if (response.data.success) {
            refreshFavorite();
         } else {
            alert("Failed to remove favorite");
         }
      });
   };

   const renderTable = FavoriteMovies.map((favoriteMovie, index) => {
      const content = <div>{favoriteMovie.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favoriteMovie.moviePost}`} /> : "no image"}</div>;

      return (
         <tr key={index}>
            <React.Fragment>
               <Popover content={content} title={favoriteMovie.movieTitle}>
                  <td>{favoriteMovie.movieTitle}</td>
               </Popover>
               <td> {favoriteMovie.movieRunTime} mins</td>
               <td>
                  <Button onClick={() => removeFavoriteButton(favoriteMovie.userFrom, favoriteMovie.movieId)}>Remove</Button>
               </td>
            </React.Fragment>
         </tr>
      );
   });

   return (
      <div>
         <div style={{ width: "85%", margin: "3rem auto" }}>
            <h2>Favorite Movies By Me</h2>
            <hr />

            <table>
               <thead>
                  <tr>
                     <th>Movie Title</th>
                     <th>Movie Runtime</th>
                     <th>Remove from favorite</th>
                  </tr>
               </thead>
               <tbody>{renderTable}</tbody>
            </table>
         </div>
      </div>
   );
}

export default FavoritePage;
