import React from 'react';
import { useSelector } from 'react-redux';

const ReportsChecksheetStatus = () => {
  const { checksheetStatus } = useSelector((state) => state.dashboard);
  
  const LEGEND = [
    { label: 'Reviewed', value: checksheetStatus.reviewed, color: 'bg-[#0BB783]', text: 'text-white' },
    { label: 'Completed', value: checksheetStatus.completed, color: 'bg-[#FFC107]', text: 'text-[#495057]' },
    { label: 'Pending', value: checksheetStatus.pending, color: 'bg-[#E1505F]', text: 'text-white' },
    { label: 'Alloted', value: checksheetStatus.alloted, color: 'bg-[#3D8BFD]', text: 'text-white' },
  ];

  const total = checksheetStatus.reviewed + checksheetStatus.completed + checksheetStatus.pending + checksheetStatus.alloted;

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-5 w-full max-w-sm mx-auto" style={{ minHeight: '400px' }}>
      {/* Chart Rings */}
      <div className="relative w-56 h-56 mb-6">
        {/* Outer Ring (Green) */}
        <div className="absolute w-full h-full">
          <div className="absolute w-full h-full rounded-full border-[20px] border-[#F6F6F6]" />
          <div className="absolute w-full h-full rounded-full border-[20px] border-transparent border-t-[#0BB783] border-r-[#0BB783]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
        {/* Middle Ring (Yellow) */}
        <div className="absolute w-40 h-40 left-8 top-8">
          <div className="absolute w-full h-full rounded-full border-[16px] border-[#F6F6F6]" />
          <div className="absolute w-full h-full rounded-full border-[16px] border-transparent border-t-[#FFC107]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
        {/* Inner Ring (Red) */}
        <div className="absolute w-24 h-24 left-16 top-16">
          <div className="absolute w-full h-full rounded-full border-[12px] border-[#F6F6F6]" />
          <div className="absolute w-full h-full rounded-full border-[12px] border-transparent border-t-[#E1505F]" style={{ transform: 'rotate(-90deg)' }} />
        </div>
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-gray-500 text-lg">Total</div>
          <div className="text-blue-500 text-2xl font-bold">{total}</div>
        </div>
      </div>
      {/* Legend fixed at bottom */}
      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
        {LEGEND.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded flex items-center justify-center ${item.color} text-sm font-bold ${item.text}`}>
              {item.value}
            </div>
            <span className="text-sm text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsChecksheetStatus;
