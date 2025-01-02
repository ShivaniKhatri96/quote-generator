import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LayoutQuote from "./components/LayoutQuote";

function App() {
  const [quoteList, setQuoteList] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [historyQuotes, setHistoryQuotes] = useState([]);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
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

  useEffect(() => {
    if (selectedQuote !== null) {
      setHistoryQuotes((prevState) => {
        //making sure the newly added quote stays on top of the list
        const updatedQuotes = [selectedQuote, ...prevState];
        //making sure duplicates are removed from history
        const uniqueQuotes = [...new Set(updatedQuotes)];
        return uniqueQuotes;
      });
    }
  }, [selectedQuote]);

  return (
    <>
      <button onClick={randomClick}>New Quote</button>
      {selectedQuote && (
        <LayoutQuote quote={selectedQuote} />
      )}
      <div>
        {historyQuotes?.length > 0 && (
          <>
            <button onClick={() => setIsHistoryShown(!isHistoryShown)}>
              History quotes
            </button>
            {isHistoryShown && (
              <div>
                {historyQuotes?.map((quote) => (
                  <LayoutQuote quote={quote} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
