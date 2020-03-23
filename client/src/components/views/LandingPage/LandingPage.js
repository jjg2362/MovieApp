import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import Banner from "./Section/Banner";
import GridCard from "../common/GridCard";

function LandingPage() {
   const [Movies, setMovies] = useState([]);
   const [BannerMovie, setBannerMovie] = useState(null);
   const [CurrentPage, setCurrentPage] = useState(0);

   useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
   }, []);

   const fetchMovies = endpoint => {
      fetch(endpoint)
         .then(response => response.json())
         .then(response => {
            setMovies([...Movies, ...response.results]);
            setBannerMovie(response.results[0]);
            setCurrentPage(response.page);
         });
   };

   const onButton = () => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
      fetchMovies(endpoint);
   };

   return (
      BannerMovie !== null && (
         <div style={{ width: "100%", margin: "0" }}>
            {/* Banner */}
            <Banner image={`${IMAGE_BASE_URL}w1280${BannerMovie.backdrop_path}`} title={BannerMovie.title} desc={BannerMovie.overview} />

            <div style={{ width: "85%", margin: "1rem auto" }}>
               <h2>Movies by latest</h2>
               <hr />

               <Row gutter={[16, 16]}>
                  {Movies.map(movie => (
                     <React.Fragment key={movie.id}>
                        <GridCard image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} movieName={movie.title} movieId={movie.id}></GridCard>
                     </React.Fragment>
                  ))}
               </Row>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <button onClick={onButton}>Load more</button>
            </div>
         </div>
      )
   );
}

export default LandingPage;
