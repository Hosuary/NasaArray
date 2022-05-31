
import React from 'react';
import {Paper, InputBase, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({
  placeholder,
  className,
  onSearch,
  onChange
}) => {
  const [searchString, setSearchString] = React.useState(null);

  const handleChange = e => {
    const string = e.target.value;
    setSearchString(string);

    if (onChange) {
      onChange(string);
    }
  };

  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      className={className}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        value={searchString}
        onChange={handleChange}
        onKeyDown={e => e.key === 'Enter' && onSearch(searchString)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;