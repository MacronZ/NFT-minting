import React from 'react';
import '../styles/Generic.scss';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function PageLoader() {
  return (
    <div className="page-loader">
      <ScaleLoader color="#50B848" size={300} />
    </div>
  );
}
