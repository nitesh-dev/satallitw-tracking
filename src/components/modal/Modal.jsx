import React from 'react';
import './modal.css';

const Modal = ({ title, btn, setShowModal, showModal, satelliteName }) => {
  const handleClose = () => setShowModal(false);

  const modalStyle = {
    display: showModal ? 'block' : 'none',
    animation: `${showModal ? 'fadeIn' : 'fadeOut'} 0.3s ease-in-out`,
    transition: 'opacity 0.3s ease-in-out',
    opacity: showModal ? 1 : 0,
  };

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
                    {satelliteName}?
                  </p>
                </div>
              ) : (
                <div className="other-modal">
                  <form action="">
                    <div className="row">
                      <div className="col-12 mt-3">
                        <input
                          placeholder="Name"
                          className="w-100 input rounded"
                          type="text"
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <input
                          placeholder="Owner"
                          className="w-100 input rounded"
                          type="text"
                        />
                      </div>

                      <div className="col-md-6 col-12 mt-3">
                        <input
                          placeholder="Longitude"
                          className="w-100 input rounded"
                          type="text"
                        />
                      </div>

                      <div className="col-md-6 col-12 mt-3">
                        <input
                          placeholder="Latitude"
                          className="w-100 input rounded"
                          type="text"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary text-uppercase"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${
                  title === 'Delete' ? 'danger' : 'primary'
                } text-uppercase`}
                onClick={handleClose}
              >
                {btn}
              </button>
            </div>
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
