import { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../context";
import People from "../components/cards/People";

const Search = () => {
  const [state] = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/search-user/${query}`);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-inline row " onSubmit={searchUser}>
        <div className="col-8">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            value={query}
            className="form-control mr-sm-2 col"
            placeholder="Search"
            type="search"
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outlined-primary col-12" type="submit">
            Search
          </button>
        </div>
      </form>
      {result && result.map((r) => <People key={r._id} people={result} />)}
    </>
  );
};

export default Search;
