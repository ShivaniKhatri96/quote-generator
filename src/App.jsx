import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [quoteList, setQuoteList] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    // if (quoteList === null) {
    const fetchData = async () => {
      const api_url =
        "https://go-quote.azurewebsites.net/quotes?page=3&page_size=30&format=json";
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setQuoteList(data.quotes);
      } catch (err) {
        console.log(err);
        setQuoteList(null);
      }
    };
    fetchData();
    // }
  }, []);

  const randomClick = () => {
    setSelectedQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
  };
  return (
    <>
      <button onClick={randomClick}>New Quote</button>
      {selectedQuote && (
        <div>
          <div>{selectedQuote?.text}</div>
          <div>- {selectedQuote?.author}</div>
        </div>
      )}
    </>
  );
}

export default App;
