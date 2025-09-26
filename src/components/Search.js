// Search.js
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";

const Search = () => {
  const { search, setSearch } = useData();
  const [local, setLocal] = useState(search || "");

  useEffect(() => {
    const t = setTimeout(() => setSearch(local), 250); // debounce
    return () => clearTimeout(t);
  }, [local, setSearch]);

  return (
    <form
      className="d-inline-block"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="input-group input-group-sm glass p-1">
        <input
          type="text"
          className="form-control bg-transparent border-0"
          placeholder="Search projects..."
          name="search"
          id="search"
          autoComplete="off"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          aria-label="Search projects"
        />
      </div>
    </form>
  );
};

export default Search;
