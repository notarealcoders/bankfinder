import React from "react";

const Spinner = ({ className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
  </div>
);

export default Spinner;
