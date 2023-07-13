import React from 'react'

const SearchItem = ({title}) => {
  return (
    <div className="d-flex align-items-center justify-content-between border-top items">
      <p className="mb-0 px-2 px-md-3 py-2">{title}</p>
    </div>
  )
}

export default SearchItem