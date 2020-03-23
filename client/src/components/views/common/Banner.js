import React from "react";

function Banner(props) {
   return (
      <div
         style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0)
      39%,rgba(0, 0, 0, 0)
      41%,rgba(0, 0, 0, 0.65)
      100%), url('${props.image}'), #1c1c1c`,
            backgroundSize: "100% cover",
            backgroundPosition: "center center",
            width: "100%",
            position: "relative",
            height: "500px"
         }}
      >
         <div>
            <div style={{ position: "absolute", maxWidth: "500px", bottom: "2rem", marginLeft: "2rem" }}>
               <h2 style={{ color: "#fff" }}>{props.title}</h2>
               <p style={{ color: "#fff", fontSize: "14px" }}>{props.desc}</p>
            </div>
         </div>
      </div>
   );
}

export default Banner;
