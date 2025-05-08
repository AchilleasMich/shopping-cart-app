import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message = "Something is wrong" }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

// Error component is used to display error messages in the UI.

export default Error;