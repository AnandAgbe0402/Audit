import React from 'react';
import { useSelector } from 'react-redux';

const ReportsAuditorStatusChart = () => {
  const { auditorStatus } = useSelector((state) => state.dashboard);
  
  // Chart data with percentages for vertical growth - Reports Auditor specific
  const chartData = [
    { 
      label: 'Approved', 
      value: auditorStatus.approved, 
      color: '#16DBCC', 
      percentage: 60,
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval Pending', 
      value: auditorStatus.approvalPending, 
      color: '#FF82AC', 
      percentage: 25,
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Auto Submitted', 
      value: auditorStatus.autoSubmitted, 
      color: '#4C78FF', 
      percentage: 45,
      baseRadius: 55,
      maxRadius: 120
    },
    { 
      label: 'Approval In Progress', 
      value: auditorStatus.approvalInProgress, 
      color: '#FFBB38', 
      percentage: 30,
      baseRadius: 55,
      maxRadius: 120
    },
  ];

  // Calculate segments with vertical growth (radius-wise)
  const pieSegments = chartData.map((item, index) => {
    const startAngle = index * 90;
    const endAngle = startAngle + 90;
    
    const radiusRange = item.maxRadius - item.baseRadius;
    const outerRadius = item.baseRadius + (item.percentage / 100) * radiusRange;
    
    return {
      ...item,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: item.baseRadius,
      outerRadius: outerRadius,
      angle: 90
    };
  });

  const createPiePath = (centerX, centerY, radius, startAngle, endAngle, innerRadius = 0) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    if (innerRadius > 0) {
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      
      return [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    } else {
      return [
        "M", centerX, centerY,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
    }
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-5 xl:p-6 w-full h-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between items-center">
      <h3 className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg self-start mb-3 sm:mb-4 w-full">
        Auditor Status
      </h3>
      
      {/* Pie Chart */}
      <div className="relative flex-none mx-auto w-56 h-56 sm:w-64 sm:h-64">
        <svg width="100%" height="100%" viewBox="0 0 320 320" className="absolute inset-0">
          {pieSegments.map((segment, index) => (
            <path
              key={index}
              d={createPiePath(160, 160, segment.outerRadius, segment.startAngle, segment.endAngle, segment.innerRadius)}
              fill={segment.color}
              className="transition-all duration-500 ease-in-out hover:opacity-80"
            />
          ))}
          <circle cx="160" cy="160" r="55" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mt-2 sm:mt-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-white" style={{ background: item.color }}>
              {item.value}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsAuditorStatusChart;
