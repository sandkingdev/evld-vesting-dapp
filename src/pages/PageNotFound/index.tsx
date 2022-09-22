import * as React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

const PageNotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className='page-not-found container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center d-flex flex-column justify-content-center'>
              <div className='dapp-icon icon-medium'>
                Error
              </div>
              <span className='h4 empty-heading mt-3'>Page not found</span>
              <span className='empty-details'>{pathname}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
