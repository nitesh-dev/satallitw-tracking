import React, { useState } from 'react';
import SatellitesCard from './SatellitesCard';
import Modal from '../modal/Modal';

const List = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBtn, setModalBtn] = useState('');
  const [satelliteName, setSatelliteName] = useState('');

  const handleAdd = () => {
    setShowModal(true);
    setModalTitle('Add');
    setModalBtn('Add');
  };

  const handleDelete = (title) => {
    setShowModal(true);
    setModalTitle('Delete');
    setModalBtn('CONTINUE');
    setSatelliteName(title);
  };

  const handleUpdate = () => {
    setShowModal(true);
    setModalTitle('Update');
    setModalBtn('Update');
  };

  const handleDetails = () => {
    setShowModal(true);
    setModalTitle('Details');
    setModalBtn('Close');
  };

  return (
    <>
      <Modal
        satelliteName={satelliteName}
        title={modalTitle}
        btn={modalBtn}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="col-md-6 col-12 px-md-5 ">
        <div className="home-card py-2 py-md-3 shadow-sm rounded satellites">
          <p className="heading px-2 px-md-3 mb-2">Satellites</p>
          {data?.map((item, i) => (
            <SatellitesCard
              handleDetails={handleDetails}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              key={i}
              title={item.title}
            />
          ))}

          <div className="px-2 px-md-3 mt-4">
            <button onClick={handleAdd} className="btn btn-primary w-100">
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
