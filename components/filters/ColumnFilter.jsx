import React from "react";

const ColumnFilter = ({ column, value, onChange }) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Filter ${column}...`}
      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
};

export default ColumnFilter;
