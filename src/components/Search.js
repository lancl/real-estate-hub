import React from "react";
import Autosuggest from "react-autosuggest";

const Search = ({
  query,
  suggestions,
  getSuggestionValue,
  renderSuggestion,
  handleChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  handleClick,
}) => {
  return (
    <div className="Search-Container">
      <form>
        {/* <input
          type="text"
          placeholder="Search for a city"
          onChange={handleChange}
        ></input> */}
        <Autosuggest
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            value: query,
            onChange: handleChange,
          }}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
        />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
