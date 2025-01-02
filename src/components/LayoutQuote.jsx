import React from "react";

const LayoutQuote = ({ quote, favoriteIds, setFavoriteIds }) => {
  const saveFavorites = (id) => {
    setFavoriteIds((prevState) => {
      // if the id already exists in the state, we remove it otherwise we add it
      const updatedList = prevState.includes(id)
        ? prevState.filter((favoriteId) => favoriteId !== id)
        : [...prevState, id];

      // Saving to local storage
      localStorage.setItem("cachedFavoriteIds", JSON.stringify(updatedList));
      return updatedList;
    });
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
