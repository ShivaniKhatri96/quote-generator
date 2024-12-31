// import inspirationalQuotes from "./assets/quotes.js";

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [quoteList, setQuoteList] = useState(null);

  useEffect(() => {
    // if (quoteList === null) {
      const fetchData = async () => {
        const api_url = "https://go-quote.azurewebsites.net/quotes?page=1&page_size=20&format=json";
        try {
          const response = await fetch(api_url);
          const data = await response.json();
          console.log('dataaa', data.quotes);
          setQuoteList(data.quotes);
        } catch (err) {
          console.log(err);
          setQuoteList(null);
        }
      };
      fetchData();
     
    // }
  }, []);

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
      <button>New Quote</button>
      {/* <button onClick={randomClick}>New Quote</button> */}
      <div>{selectedQuote}</div>
    </>
  );
}

export default App;
