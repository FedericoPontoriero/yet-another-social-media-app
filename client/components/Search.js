import { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../context";

const Search = () => {
  const [state] = useContext(UserContext);

  const [query, setQuery] = useState("");

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/search-user/${query}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-inline row pt-2" onSubmit={searchUser}>
        <div className="col-8">
          <input
            onChange={(e) => setQuery(e.target.value)}
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
    </>
  );
};

export default Search;
