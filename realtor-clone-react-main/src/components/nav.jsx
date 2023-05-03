import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic with searchQuery
    console.log('Performing search with query:', searchQuery);

    // Clear the search input
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by location, price, etc..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
