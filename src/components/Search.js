import { useData } from "../context/DataContext";

const Search = () => {
  const { search, setSearch } = useData();

  return (
    <form className="d-inline-block" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="input-group input-group-sm glass p-1">
        <input
          type="text"
          className="form-control bg-transparent border-0"
          placeholder="Search projects..."
          name="search"
          id="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search projects"
        />
      </div>
    </form>
  );
};

export default Search;
