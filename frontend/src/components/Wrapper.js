import React from 'react';

const PageWrapper = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 italic text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;