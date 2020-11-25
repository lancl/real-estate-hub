// [TBD] Add a filter for year (via DB's 'date' field)

import React from "react";
import Autosuggest from "react-autosuggest";

// About: render a suggestion
const renderSuggestion = (suggestion) => <span>{suggestion}</span>;

const SearchFilters = ({
  city1,
  city2,
  suggestions,
  handleChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  handleClick,
}) => {
  return (
    <div className="Search-Container">
      <p>First city (required): </p>
      <Autosuggest
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
        inputProps={{
          value: city1,
          onChange: (event, { newValue }) => handleChange(event, newValue, 1),
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
      />

      <p>Second city: </p>
      <Autosuggest
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
        inputProps={{
          value: city2,
          onChange: (event, { newValue }) => handleChange(event, newValue, 2),
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
      />

      <button className="Search-Button" type="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
    // </form>
  );
};

/**
// About: the old version of this component, before auto-suggestion was added
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
*/

export default SearchFilters;
