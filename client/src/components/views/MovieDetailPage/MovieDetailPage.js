import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Row, Button } from "antd";
import Banner from "../common/Banner";
import MovieInfo from "./Section/MovieInfo";
import Favorite from "./Section/Favorite";
import Comment from "./Section/Comment";
import GridCard from "../common/GridCard";

function MovieDetailPage(props) {
   const [Movie, setMovie] = useState([]);
   const [Casts, setCasts] = useState([]);
   const [OpenActorView, setOpenActorView] = useState(false);
   const movieId = props.match.params.movieId;

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
   }, []);

   const onActorViewButton = () => {
      setOpenActorView(!OpenActorView);
   };

   return (
      <div>
         <Banner image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.title} desc={Movie.overview} />

         <div style={{ width: "85%", margin: "1rem auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
               <Favorite userFrom={localStorage.getItem("userId")} movieId={movieId} movieInfo={Movie} />
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
         </div>
      </div>
   );
}

export default MovieDetailPage;
