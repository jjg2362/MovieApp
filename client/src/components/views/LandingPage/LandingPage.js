import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import Banner from "./Section/Banner";

function LandingPage() {
   const [Movies, setMovies] = useState([]);
   const [BannerMovie, setBannerMovie] = useState(null);

   useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetch(endpoint)
         .then(response => response.json())
         .then(response => {
            setMovies([...response.results]);
            setBannerMovie(response.results[0]);
         });
   }, []);

   return (
      BannerMovie !== null && (
         <div style={{ width: "100%", margin: "0" }}>
            {/* Banner */}
            <Banner image={`${IMAGE_BASE_URL}w1280${BannerMovie.backdrop_path}`} title={BannerMovie.title} desc={BannerMovie.overview} />

            <div style={{ width: "85%", margin: "1rem auto" }}>
               <h2>Movies by latest</h2>
               <hr />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
               <button>Load more</button>
            </div>
         </div>
      )
   );
}

export default LandingPage;
