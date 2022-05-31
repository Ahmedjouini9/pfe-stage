import React from 'react';
import { Link } from 'react-router-dom';

const ManageNavigation = () => {
  return (
    <Link to='/manage'>
      <div className='rentalDetail__back'>
        <FontAwesomeIcon icon="fas fa-angle-double-left" />
        <span>Back to Manage Page</span>
      </div>
    </Link>
  );
};

export default ManageNavigation;
