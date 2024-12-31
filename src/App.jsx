import inspirationalQuotes from "./assets/quotes.js";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [selectedQuote, setSelectedQuote] = useState();
  const randomClick = () => {
    setSelectedQuote(
      inspirationalQuotes[
        Math.floor(Math.random() * inspirationalQuotes.length)
      ]
    );
  };
  return (
    <>
      {/* <div>
        {inspirationalQuotes.map((quote) => (
          <div>{quote}</div>
        ))}
      </div> */}
      <button onClick={randomClick}>New Quote</button>
      <div>{selectedQuote}</div>
    </>
  );
}

export default App;
