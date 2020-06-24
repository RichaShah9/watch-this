import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { search } from "../services";

export default function SearchBar({ handleHover }) {
  const [searchText, setsearchText] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      if (searchText && Array.from(searchText).length > 2) {
        let options = await search(searchText);
        setOptions(options);
      }
    })();
  }, [searchText]);

  return (
    <Autocomplete
      id="search"
      options={options}
      onMouseLeave={handleHover}
      getOptionLabel={(option) => option.Title}
      style={{ width: 300 }}
      onInputChange={(e, val) => setsearchText(val)}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
      size="small"
    />
  );
}
