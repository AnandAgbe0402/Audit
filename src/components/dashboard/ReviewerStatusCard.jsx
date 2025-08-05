import React from 'react';
import { useSelector } from 'react-redux';

const ReviewerStatusCard = ({ cardType = 'reviewer' }) => {
  const { auditorStatus, reviewerStatus } = useSelector((state) => state.dashboard);
  
  const statusData = cardType === 'auditor' ? auditorStatus : reviewerStatus;
  
  const LEGEND = [
    { label: 'Auto Submitted', value: statusData.autoSubmitted, color: '#4C78FF' },
    { label: 'Approval In Progress', value: statusData.approvalInProgress, color: '#FFBB38' },
    { label: 'Approved', value: statusData.approved, color: '#16DBCC' },
    { label: 'Approval Pending', value: statusData.approvalPending, color: '#FF82AC' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center p-5 w-full max-w-sm mx-auto" style={{ minHeight: '400px' }}>
      {/* Donut Chart */}
      <div className="relative flex-none mx-auto w-56 h-56">
        <svg width="100%" height="100%" viewBox="0 0 274 271" className="absolute inset-0">
          {/* Auto Submitted - Blue */}
          <path d="M 137 40 A 90 90 0 0 1 227 135 L 184 135 A 47 47 0 0 0 137 88 Z" fill="#4C78FF" />
          {/* Approval In Progress - Yellow */}
          <path d="M 227 135 A 90 90 0 0 1 137 225 L 137 182 A 47 47 0 0 0 184 135 Z" fill="#FFBB38" />
          {/* Approved - Teal */}
          <path d="M 137 225 A 90 90 0 0 1 47 135 L 90 135 A 47 47 0 0 0 137 182 Z" fill="#16DBCC" />
          {/* Approval Pending - Pink */}
          <path d="M 47 135 A 90 90 0 0 1 137 40 L 137 88 A 47 47 0 0 0 90 135 Z" fill="#FF82AC" />
          {/* Inner white circle */}
          <circle cx="137" cy="135" r="47" fill="#FFFFFF" />
        </svg>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 w-full mt-4">
        {LEGEND.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold text-white" style={{ background: item.color }}>
              {item.value}
            </div>
            <span className="text-sm text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewerStatusCard;
