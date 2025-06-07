import React, { ReactNode } from "react";

const TableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-sm shadow-lg shadow-gray-500/5 border border-gray-100 bg-white p-5 relative">
      {children}
    </div>
  );
};

export default TableContainer;
