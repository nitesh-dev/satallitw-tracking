import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Map from '../../components/map/Map';
import List from '../../components/list/List';
import Search from '../../components/search/Search';
import axios from 'axios';

const data = [
  {
    id: 100,
    owner: 'Owner 1',
    name: 'Alpha 1',
    latitude: 20.5937,
    longitude: 78.9629,
    selected: true,
  },

  {
    id: 1,
    owner: 'Owner 2',
    name: 'Alpha 2',
    latitude: -5.440049,
    longitude: 100,
    selected: false,
  },

  {
    id: 2,
    owner: 'Owner 3',
    name: 'Alpha 3',
    latitude: 50,
    longitude: 100,
    selected: false,
  },

  {
    id: 3,
    owner: 'Owner 4',
    name: 'Alpha 4',
    latitude: -50,
    longitude: 100,
    selected: true,
  },
];

const Home = () => {
  const getSatellites = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/satellites`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSatellites();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <List data={data} />
        <Map data={data} />

        <Search data={data} />
      </div>
    </div>
  );
};

export default Home;
