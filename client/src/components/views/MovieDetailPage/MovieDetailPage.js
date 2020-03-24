import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Row, Button } from "antd";
import Axios from "axios";
import Banner from "../common/Banner";
import MovieInfo from "./Section/MovieInfo";
import Favorite from "./Section/Favorite";
import Comment from "./Section/Comment";
import GridCard from "../common/GridCard";

function MovieDetailPage(props) {
   const userFrom = localStorage.getItem("userId");
   const movieId = props.match.params.movieId;

   const [Movie, setMovie] = useState([]);
   const [Casts, setCasts] = useState([]);
   const [Comments, setComments] = useState([]);

   const [OpenActorView, setOpenActorView] = useState(false);

   useEffect(() => {
      const infoEndpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`;
      const creditEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`;
      fetch(infoEndpoint)
         .then(response => response.json())
         .then(response => {
            setMovie(response);
         });

      fetch(creditEndpoint)
         .then(response => response.json())
         .then(response => {
            setCasts(...[response.cast]);
         });

      let variables = { writer: userFrom, movieId: movieId };
      Axios.post("/api/comment/getComments", variables).then(response => {
         if (response.data.success) {
            setComments(response.data.comments);
         } else {
            alert("Failed to get comments");
         }
      });
   }, []);

   const refreshComment = newComment => {
      setComments(Comments.concat(newComment));
   };

   const onActorViewButton = () => {
      setOpenActorView(!OpenActorView);
   };

   return (
      <div>
         <Banner image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.title} desc={Movie.overview} />

         <div style={{ width: "85%", margin: "1rem auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
               <Favorite userFrom={userFrom} movieId={movieId} movieInfo={Movie} />
            </div>

            <MovieInfo movie={Movie} />
            <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
               <Button type="primary" size="large" onClick={onActorViewButton}>
                  Toggle Actor/Acress View
               </Button>
            </div>

            {OpenActorView && (
               <div>
                  <h2>Actor & Actress</h2>
                  <hr />
                  {Casts && (
                     <Row gutter={[16, 16]}>
                        {Casts.map(cast => (
                           <React.Fragment key={cast.cast_id}>
                              <GridCard image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} characterName={cast.name}></GridCard>
                           </React.Fragment>
                        ))}
                     </Row>
                  )}
               </div>
            )}

            <h2>Share your opinions about {Movie.title}</h2>
            <hr />
            <Comment userId={userFrom} movieId={Movie.id} comments={Comments} refreshFunc={refreshComment} />
         </div>
      </div>
   );
}

export default MovieDetailPage;
