import { useData } from "../context/DataContext";
import "../styles/Search.css";

const Search = () => {
  const { search, setSearch } = useData();

  return (
    <div className="search-container">
      <form className="project-search-form">
        <input
          type="text"
          placeholder="Search projects..."
          name="search"
          id="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
