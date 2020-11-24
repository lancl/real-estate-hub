import React from "react";

const Search = ({ handleChange, handleClick }) => {
  return (
    <div className="Search-Container">
      <form>
        <input
          type="text"
          placeholder="Search for a city"
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
