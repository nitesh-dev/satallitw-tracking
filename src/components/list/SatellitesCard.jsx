import React from 'react';

const SatellitesCard = ({
  title,
  handleDelete,
  handleUpdate,
  handleDetails,
}) => {
  return (
    <div
      style={{ cursor: 'default' }}
      className="d-flex align-items-center justify-content-between border-top items"
    >
      <p onClick={handleDetails} className="mb-0 px-2 px-md-3 py-2">
        {title}
      </p>

      <div className="px-2 px-md-3 py-2 d-flex gap-md-3 gap-2">
        <button type="button" onClick={() => handleDelete(title)}>
          <i className="bi bi-trash text-danger"></i>
        </button>
        <button type="button" onClick={handleUpdate}>
          <i className="bi bi-pencil-square text-primary"></i>
        </button>
      </div>
    </div>
  );
};

export default SatellitesCard;
