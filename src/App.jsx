import { useState, useEffect } from "react";
import "./App.css";
import LayoutQuote from "./components/LayoutQuote";

function App() {
  const [quoteList, setQuoteList] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [historyQuotes, setHistoryQuotes] = useState([]);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const fetchData = async () => {
    const api_url =
      "https://go-quote.azurewebsites.net/quotes?page=3&page_size=30&format=json";
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      setQuoteList(data.quotes);
      localStorage.setItem("cachedQuoteList", JSON.stringify(data.quotes));
    } catch (err) {
      console.log(err);
      setQuoteList(null);
    }
  };

  useEffect(() => {
    //we check if window is defined (indicating that the code is running in the browser environment)
    if (typeof window !== "undefined") {
      const cachedQuoteList = localStorage?.getItem("cachedQuoteList");
      const cachedFavoriteIds = localStorage?.getItem("cachedFavoriteIds");
      const cachedHistoryQuotes = localStorage.getItem("cachedHistoryQuotes");
      // Retrieve and set the quote list
      if (cachedQuoteList) {
        setQuoteList(JSON.parse(cachedQuoteList));
      } else {
        fetchData();
      }

      //Retrieve and set the favorite IDs
      if (cachedFavoriteIds) {
        setFavoriteIds(JSON.parse(cachedFavoriteIds));
      }

      //Retrieve and set the quotes history
      if (cachedHistoryQuotes) {
        setHistoryQuotes(JSON.parse(cachedHistoryQuotes));
      }
    }
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

        // Saving to local storage
        localStorage.setItem(
          "cachedHistoryQuotes",
          JSON.stringify(uniqueQuotes)
        );
        return uniqueQuotes;
      });
    }
  }, [selectedQuote]);

  // filtering favorite quotes
  const favoriteQuotes = quoteList?.filter((quote) =>
    favoriteIds.includes(quote.id)
  );
  return (
    <>
      <button onClick={randomClick}>New Quote</button>
      {selectedQuote && (
        <LayoutQuote
          quote={selectedQuote}
          favoriteIds={favoriteIds}
          setFavoriteIds={setFavoriteIds}
        />
      )}
      {favoriteQuotes?.length > 0 && (
        <div>
          <div>Favorites</div>
          {favoriteQuotes?.map((quote) => (
            <LayoutQuote
              quote={quote}
              key={quote.id}
              favoriteIds={favoriteIds}
              setFavoriteIds={setFavoriteIds}
            />
          ))}
        </div>
      )}
      {historyQuotes?.length > 0 && (
        <div>
          <button onClick={() => setIsHistoryShown(!isHistoryShown)}>
            History quotes
          </button>
          {isHistoryShown && (
            <div>
              {historyQuotes?.map((quote) => (
                <LayoutQuote
                  quote={quote}
                  key={quote.id}
                  favoriteIds={favoriteIds}
                  setFavoriteIds={setFavoriteIds}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
