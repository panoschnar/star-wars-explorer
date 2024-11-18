import { useStarWarsContext } from "../context/StarWarsContext";
import Button from "./Button";

const SearchBar = () => {
  const { query, setQuery, loading, searchEntities, clearSearch } =
    useStarWarsContext();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query) {
            searchEntities();
        }
    };
  return (
    <div className="search-bar">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for characters, planets, or starships..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input"
        />
        {query && (
          <button
            className="clear-button"
            onClick={(e)=>clearSearch(e)}
            aria-label="Clear search"
          >
            ✖
          </button>
        )}
      </div>
      <Button
        onClick={searchEntities}
        type="primary"
        disabled={loading || !query}
        label={"Search"}
        loading={loading}
      />
    </div>
  );
};

export default SearchBar;
