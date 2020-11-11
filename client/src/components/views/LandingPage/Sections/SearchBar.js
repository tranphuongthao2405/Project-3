import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchBar(props) {
  const [searchTerms, setSearchTerms] = useState("");
  const onSearchChange = (event) => {
    setSearchTerms(event.target.value);
    props.refreshFunction(event.target.value);
  };
  return (
    <div>
      <Search
        value={searchTerms}
        onChange={onSearchChange}
        placeholder="Search places"
      />
    </div>
  );
}

export default SearchBar;
