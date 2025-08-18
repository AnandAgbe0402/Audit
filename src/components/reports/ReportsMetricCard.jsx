import React from 'react';

const ReportsMetricCard = ({ title, value, change, changeType, icon, color, size = 'normal' }) => {
  const getIconWithColor = () => {
    const IconComponent = icon;
    if (!IconComponent) return null;
    
    return (
      <div className={`p-1.5 sm:p-2 rounded-lg bg-${color}-100 flex-shrink-0`}>
        <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 text-${color}-600`} />
      </div>
    );
  };

  const getChangeIndicator = () => {
    if (!change) return null;
    
    const isPositive = changeType === 'positive';
    const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
    const bgClass = isPositive ? 'bg-green-50' : 'bg-red-50';
    const borderClass = isPositive ? 'border-green-200' : 'border-red-200';
    
    return (
      <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${colorClass} ${bgClass} ${borderClass} flex-shrink-0`}>
        {isPositive ? '+' : ''}{change}%
      </span>
    );
  };

  const cardClasses = size === 'large'
    ? 'bg-white rounded-xl border border-gray-300 shadow-sm p-3 sm:p-4 lg:p-6 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between'
    : 'bg-white rounded-xl border border-gray-300 shadow-sm p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] flex flex-col justify-between';

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 leading-tight">
            {title}
          </h3>
          <p className={`font-bold text-gray-900 leading-tight ${
            size === 'large' 
              ? 'text-xl sm:text-2xl lg:text-3xl' 
              : 'text-lg sm:text-xl lg:text-2xl'
          }`}>
            {Number(value).toLocaleString()}
          </p>
        </div>
        {getIconWithColor()}
      </div>
      
      {change && (
        <div className="flex items-center justify-between gap-2 mt-auto">
          {getChangeIndicator()}
          <span className="text-xs text-gray-500 flex-shrink-0">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
};

export default ReportsMetricCard;
