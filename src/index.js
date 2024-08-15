import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v2s";
import StarRating from "./StarRating";

// function Test() {
//   const [movierating, Setmoviesrating] = useState(0);

//   return (
//     <div>
//       <StarRating color="blue" onSetrating={Setmoviesrating} />
//       <p>This movie has been rated {movierating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxrating={4} messages={["bad", "okay", "good", "very good"]} />
    <StarRating
      maxrating={10}
      size={20}
      color={"red"}
      className={"test"}
      defaultRating={5}
    />
    <Test /> */}
  </React.StrictMode>
);
