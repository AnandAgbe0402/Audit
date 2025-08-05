import React from 'react';

const MetricCard = ({ title, value, icon: Icon, bgColor, textColor, className = "" }) => {
  return (
    <div className={`${bgColor} ${textColor} p-3 sm:p-4 rounded-lg shadow-sm ${className}`} style={{ minHeight: '100px' }}>
      <div className="flex flex-col items-start justify-center h-full">
        <div className="opacity-80 mb-1 sm:mb-2">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1">{value}</p>
        <p className="text-xs sm:text-sm opacity-90 leading-tight">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;
