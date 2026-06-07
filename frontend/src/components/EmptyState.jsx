import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-12">
      <div className="border-2 border-dashed rounded-xl p-12 text-center">
        <p className="text-lg text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;