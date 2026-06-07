import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const withLoading = (WrappedComponent) => {
  return ({ loading, error, data, ...props }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    return <WrappedComponent data={data} {...props} />;
  };
};

export default withLoading;