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
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-5 xl:p-6 w-full h-full min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]">
      <h3 className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg self-start mb-3 sm:mb-4">
        Checksheet Status
      </h3>
      
      {/* Status indicators - Better responsive layout */}
      <div className="flex flex-col gap-2 sm:gap-3 items-center w-full mt-2 sm:mt-3 lg:mt-4">
        {/* First row - Review Pending and Review in Progress */}
        <div className="flex flex-col xl:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 w-full">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="px-2 sm:px-3 h-5 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold bg-red-500 flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]">
              {checksheetStatus.reviewPending}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 text-center xl:whitespace-nowrap">
              Review Pending
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="px-2 sm:px-3 h-5 sm:h-6 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold bg-yellow-400 flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]">
              {checksheetStatus.reviewInProgress}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 text-center xl:whitespace-nowrap">
              Review In Progress
            </span>
          </div>
        </div>
        
        {/* Second row - Reviewed (centered) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="px-2 sm:px-3 h-5 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold bg-green-500 flex-shrink-0 min-w-[2rem] sm:min-w-[2.5rem]">
            {checksheetStatus.reviewed}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 text-center">
            Reviewed
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportsChecksheetStatus;
