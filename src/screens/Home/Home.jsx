import React, { useRef, useState } from 'react';
import './home.css';
import SatellitesCard from '../../components/home/SatellitesCard';
import { earth3d } from '../../assets';
import SearchItem from '../../components/home/SearchItem';
import Modal from '../../components/modal/Modal';

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
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBtn, setModalBtn] = useState('');
  const [satelliteName, setSatelliteName] = useState('')

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput)
    );

    setSearchResults(results);
  };

  const handleAdd = () => {
    setShowModal(true);
    setModalTitle('Add');
    setModalBtn('Add')
  };

  const handleDelete = (title) => {
    setShowModal(true);
    setModalTitle('Delete');
    setModalBtn('CONTINUE')
    setSatelliteName(title)
  }

  const handleUpdate = () => {
    setShowModal(true);
    setModalTitle('Update');
    setModalBtn('Update')
  }

  const handleDetails = () => {
    setShowModal(true);
    setModalTitle('Details');
    setModalBtn('Close')
  }
  

  return (
    <div className="container my-5">
      <Modal satelliteName={satelliteName}  title={modalTitle} btn={modalBtn} showModal={showModal} setShowModal={setShowModal} />

  
      <div className="row">
        <div className="col-md-6 col-12 px-md-5 ">
          <div className="home-card py-2 py-md-3 shadow-sm rounded satellites">
            <p className="heading px-2 px-md-3 mb-2">Satellites</p>
            {data?.map((item, i) => (
              <SatellitesCard handleDetails={handleDetails} handleDelete={handleDelete} handleUpdate={handleUpdate} key={i} title={item.title} />
            ))}

            <div className="px-2 px-md-3 mt-4">
              <button onClick={handleAdd} className="btn btn-primary w-100">
                ADD
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 mt-5 mt-md-0  px-md-5">
          <div className="home-card shadow-sm rounded p-2 p-md-3">
            <img className="w-100" src={earth3d} alt="" />
          </div>
        </div>

        <div className="col-md-6 col-12 my-5 my-md-5 ms-auto px-md-5">
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
                <div className="w-100 h-100 input rounded d-flex justify-content-center align-items-center">
                  <p className="m-0">Name</p>
                </div>
              </div>

              <div style={{ width: '16%' }}>
                <button
                  onClick={handleSearch}
                  className="w-100 btn btn-primary "
                >
                  <i class="bi bi-search"></i>
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
                    <p className="px-2 px-md-3 pt-2 text-danger">
                      No Result Found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
