import React, { useContext, useEffect, useState } from 'react';
import './modal.css';
import { useFormik } from 'formik';
import { inputSchema } from '../../validation/inputValidation';
import { AppContext } from '../../context/AppContext';

const initialValues = {
  name: '',
  owner: '',
  longitude: '',
  latitude: '',
};

const Modal = ({
  title,
  btn,
  setShowModal,
  showModal,
  details,
  setDetails,
}) => {
  const [inputs, setInputs] = useState({
    name: '',
    owner: '',
    longitude: '',
    latitude: '',
  });

  const { data, setData } = useContext(AppContext);

  const handleClose = () => {
    setShowModal(false);
    // setDetails(null);

    setInputs({
      name: '',
      owner: '',
      longitude: '',
      latitude: '',
    });
  };

  const modalStyle = {
    display: showModal ? 'block' : 'none',
    animation: `${showModal ? 'fadeIn' : 'fadeOut'} 0.3s ease-in-out`,
    transition: 'opacity 0.3s ease-in-out',
    opacity: showModal ? 1 : 0,
  };

  // let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: initialValues,
  //     validationSchema: inputSchema,

  //     onSubmit: async () => {
  //       console.log(values);
  //     },
  //   });

  const handleUpdate = () => {
    const itemIndex = data.findIndex((item) => item.id === details?.id);

    if (itemIndex !== -1) {
      const updatedItem = {
        ...data[itemIndex],
        ...inputs,
      };

      data[itemIndex] = updatedItem;
    }

    setShowModal(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleAdd = () => {
    setData((prev) => [...prev, { ...inputs, id: prev?.length, status: false }]);
    setShowModal(false);
   
  };

  const handleDelete = () => {
    const updatedData = data.filter((item) => item.id !== details?.id);
    setShowModal(false);
    setData(updatedData);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  useEffect(() => {
    if (title === 'Add') {
      setInputs({
        name: '',
        owner: '',
        longitude: '',
        latitude: '',
      });
    } else {
      setInputs(details);
    }
  }, [showModal]);

  return (
    <>
      <div
        className={`modal fade shadow-sm  ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="mt-3">
              <p className="modal-title text-center">{title}</p>
            </div>

            <div className="modal-body">
              {title === 'Delete' ? (
                <div className="delete-modal">
                  <p>
                    Are you sure you want to delete the sattelite -{' '}
                    {details?.name}?
                  </p>
                </div>
              ) : (
                <div className="other-modal">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 mt-3">
                        <input
                          placeholder="Name"
                          className="w-100 input rounded"
                          type="text"
                          name="name"
                          value={inputs?.name}
                          onChange={handleChange}
                          readOnly={title === 'Details' ? true : false}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <input
                          placeholder="Owner"
                          className="w-100 input rounded"
                          type="text"
                          name="owner"
                          value={inputs?.owner}
                          onChange={handleChange}
                          readOnly={title === 'Details' ? true : false}
                        />
                      </div>

                      <div className="col-md-6 col-12 mt-3">
                        <input
                          placeholder="Longitude"
                          className="w-100 input rounded"
                          type="text"
                          name="longitude"
                          value={inputs?.longitude}
                          onChange={handleChange}
                          readOnly={title === 'Details' ? true : false}
                        />
                      </div>

                      <div className="col-md-6 col-12 mt-3">
                        <input
                          placeholder="Latitude"
                          className="w-100 input rounded"
                          type="text"
                          name="latitude"
                          value={inputs?.latitude}
                          onChange={handleChange}
                          readOnly={title === 'Details' ? true : false}
                        />
                      </div>
                    </div>

                    <div className="modal-footer mt-4 p-0">
                      {title !== 'Details' && (
                        <button
                          type="button"
                          className="btn btn-outline-primary text-uppercase"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                      )}

                      <button
                        type="submit"
                        className={`btn btn-${
                          title === 'Delete' ? 'danger' : 'primary'
                        } text-uppercase`}
                        onClick={
                          title === 'Details'
                            ? handleClose
                            : title === 'Update'
                            ? handleUpdate
                            : handleAdd
                        }
                      >
                        {btn}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {title === 'Delete' && (
              <div className="modal-footer p-3">
                {title !== 'Details' && (
                  <button
                    type="button"
                    className="btn btn-outline-primary text-uppercase"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                )}

                <button
                  type="button"
                  className={`btn btn-${
                    title === 'Delete' ? 'danger' : 'primary'
                  } text-uppercase`}
                  onClick={handleDelete}
                >
                  {btn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-backdrop show" onClick={handleClose}></div>
      )}
    </>
  );
};

export default Modal;
