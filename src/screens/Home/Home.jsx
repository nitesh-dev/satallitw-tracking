import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import Map from '../../components/map/Map';
import List from '../../components/list/List';
import Search from '../../components/search/Search';
import axios from 'axios';


const data = [
  {
    title: 'Alpha 1',
  },
  {
    title: 'Alpha 2',
  },
  {
    title: 'Alpha 3',
  },
  {
    title: 'Alpha 4',
  },
  {
    title: 'Alpha 5',
  },
];


const Home = () => {
  
  const getSatellites = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}api/satellites`)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSatellites()
  }, [])
  

  return (
    <div className="container my-5">
    
  
      <div className="row">
        <List data={data} />
        <Map />

        <Search data={data} />
      </div>
    </div>
  );
};

export default Home;
