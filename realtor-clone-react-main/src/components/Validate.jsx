import React from 'react';

const Button = () => {
  const handleClick = () => {
    window.location.href = '/new-page';
  };

  return (
    <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
    onClick={handleClick}>
     Validate your account
    </button>
  );
};

export default Button;