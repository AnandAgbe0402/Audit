import React from 'react';
import { useSelector } from 'react-redux';

const ReportsMetricCard = ({ title, value, change, changeType, icon, color, size = 'normal' }) => {
  const getIconWithColor = () => {
    const IconComponent = icon;
    if (!IconComponent) return null;
    
    return (
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <IconComponent className={`h-5 w-5 text-${color}-600`} />
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
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorClass} ${bgClass} ${borderClass}`}>
        {isPositive ? '+' : ''}{change}%
      </span>
    );
  };

  const cardClasses = size === 'large' 
    ? 'bg-white rounded-xl border border-gray-300 shadow-sm p-6 min-h-[140px] flex flex-col justify-between'
    : 'bg-white rounded-xl border border-gray-300 shadow-sm p-4 min-h-[120px] flex flex-col justify-between';

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className={`font-bold text-gray-900 ${size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
            {value}
          </p>
        </div>
        {getIconWithColor()}
      </div>
      
      {change && (
        <div className="flex items-center justify-between">
          {getChangeIndicator()}
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default ReportsMetricCard;
