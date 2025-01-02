import React from "react";

const LayoutQuote = ({ quote, favoriteIds, setFavoriteIds }) => {
  const saveFavorites = (id) => {
    // true or false depending on the condition
    const isIdFound = favoriteIds.some((favoriteId) => favoriteId === id);
    if (isIdFound) {
      // removing the id if it already exists
      const updatedList = favoriteIds.filter((favoriteId) => favoriteId !== id);
      setFavoriteIds(updatedList);
    } else {
      // adding the id
      setFavoriteIds((prevState) => [...prevState, id]);
    }
  };
  console.log("favoriteIds", favoriteIds);
  return (
    <div>
      <div>{quote?.text}</div>
      <div>- {quote?.author}</div>
      <button onClick={() => saveFavorites(quote.id)}>Fav</button>
    </div>
  );
};

export default LayoutQuote;
