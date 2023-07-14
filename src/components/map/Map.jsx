import React from 'react';
import { earth3d } from '../../assets';

const Map = () => {
  return (
    <div className="col-md-6 col-12 mt-5 mt-md-0  px-md-5">
      <div
        className="home-card shadow-sm rounded p-2 p-md-3"
        style={{ aspectRatio: '1/1' }}
      >
        <img className="w-100" src={earth3d} alt="" />
      </div>
    </div>
  );
};

export default Map;
