import React, { useContext, useState } from 'react';
import SatellitesCard from './SatellitesCard';
import Modal from '../modal/Modal';
import { AppContext } from '../../context/AppContext';

const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBtn, setModalBtn] = useState('');
  const [satelliteName, setSatelliteName] = useState('');
  const [details, setDetails] = useState(null);

  const {data, setData} = useContext(AppContext)

  const handleAdd = () => {
    setShowModal(true);
    setModalTitle('Add');
    setModalBtn('Add');
    setDetails(null);
  };

  const handleDelete = (data) => {
    setShowModal(true);
    setModalTitle('Delete');
    setModalBtn('CONTINUE');
    setDetails(data);
  };

  const handleUpdate = (data) => {
    setShowModal(true);
    setModalTitle('Update');
    setModalBtn('Update');
    setDetails(data);
  };

  const handleDetails = (data) => {
    setShowModal(true);
    setModalTitle('Details');
    setModalBtn('Close');
    setDetails(data);
  };

  return (
    <>
      <Modal
        satelliteName={satelliteName}
        title={modalTitle}
        btn={modalBtn}
        showModal={showModal}
        setShowModal={setShowModal}
        details={details}
      />

      <div className="col-md-6 col-12 px-lg-5 ">
        <div className="home-card py-2 py-md-3 shadow-sm rounded satellites">
          <p className="heading px-2 px-md-3 mb-2">Satellites</p>
          {data?.map((item, i) => (
            <SatellitesCard
              handleDetails={handleDetails}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              key={i}
              data={item}
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
