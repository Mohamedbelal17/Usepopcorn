import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
<<<<<<< HEAD
import App from "./App-v1";
=======
import App from "./App-v2";
>>>>>>> ee827d97c9c69c06fed2972f3cbc7b67617262d9
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
