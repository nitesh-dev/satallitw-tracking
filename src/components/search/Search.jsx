import React, { useState } from 'react';
import SearchItem from './SearchItem';

const Search = ({ data }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchParameter, setSearchParameter] = useState('name');
  const [showDowpdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    if (searchInput?.length > 0) {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(searchInput)
      );

      setSearchResults(results);
    }
  };

  return (
    <div className="col-md-6 col-12 my-5 my-md-5 ms-auto px-lg-5">
      <div className="p-md-3 search-container">
        <p className="mb-2 heading">Search</p>
        <div className="search-box home-card p-2 shadow-sm rounded d-flex justify-content-between">
          <div style={{ width: '63%' }}>
            <input
              className="w-100 h-100 input rounded"
              type="text"
              placeholder="Search here..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div style={{ width: '16%' }}>
            <div onClick={() => setShowDropdown(!showDowpdown)} className="w-100 h-100 input rounded d-flex justify-content-center align-items-center position-relative">
              <p
                
                style={{ cursor: 'default', userSelect: 'none' }}
                className="m-0"
              >
                {searchParameter}
              </p>

              {showDowpdown && (
                <div className="card search-dropdown position-absolute w-100 shadow rounded py-0 border-bottom">
                  <p
                    onClick={() => {setSearchParameter('Name'); setShowDropdown(false)}}
                    className="mb-0 search-dropdown-item px-2 py-1"
                  >
                    Name
                  </p>
                  <p
                    onClick={() => {setSearchParameter('ID'); setShowDropdown(false)}}
                    className="mb-0 search-dropdown-item px-2 py-1"
                  >
                    ID
                  </p>
                  <p
                    onClick={() => {setSearchParameter('Owner'); setShowDropdown(false)}}
                    className="mb-0 search-dropdown-item px-2 py-1"
                  >
                    Owner
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ width: '16%' }}>
            <button onClick={handleSearch} className="w-100 btn btn-primary ">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {searchResults && (
          <div className="home-card shadow-sm rounded reachResult mt-3 py-2 py-md-3">
            <p className="heading mb-2 px-2 px-md-3">Results</p>
            {searchResults?.length ? (
              searchResults?.map((item, i) => (
                <SearchItem key={i} title={item.title} />
              ))
            ) : (
              <div className="border-top">
                <p className="px-2 px-md-3 pt-2 text-danger">No Result Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
