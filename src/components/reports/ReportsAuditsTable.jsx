import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileCheck, Filter, X, FileText, ArrowRight, Eye } from 'lucide-react';

const ReportsAuditsTable = () => {
  const { auditsData } = useSelector((state) => state.dashboard);
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status, type) => {
    let bgColor, textColor, borderColor;
    
    if (type === 'auditor') {
      switch (status) {
        case 'Completed':
          bgColor = 'bg-green-50';
          textColor = 'text-green-600';
          borderColor = 'border-green-200';
          break;
        case 'Yet to Start':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        default:
          bgColor = 'bg-gray-50';
          textColor = 'text-gray-600';
          borderColor = 'border-gray-200';
      }
    } else {
      switch (status) {
        case 'In Progress':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        case 'Approval Pending':
          bgColor = 'bg-red-50';
          textColor = 'text-red-600';
          borderColor = 'border-red-200';
          break;
        case 'Auto-submitted':
          bgColor = 'bg-blue-50';
          textColor = 'text-blue-600';
          borderColor = 'border-blue-200';
          break;
        case 'Yet to Start':
          bgColor = 'bg-orange-50';
          textColor = 'text-orange-600';
          borderColor = 'border-orange-200';
          break;
        default:
          bgColor = 'bg-gray-50';
          textColor = 'text-gray-600';
          borderColor = 'border-gray-200';
      }
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor}`}>
        {status}
      </span>
    );
  };

  const filteredData = statusFilter === 'all' 
    ? auditsData 
    : auditsData.filter(item => 
        item.auditorStatus === statusFilter || item.reviewerStatus === statusFilter
      );

  const resetFilter = () => {
    setStatusFilter('all');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4">
          {/* Filter Icon with background */}
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <Filter className="w-4 h-4 text-blue-600" />
          </div>
          
          {/* Filter By Status */}
          <span className="text-gray-700 text-sm font-medium">Filter By Status</span>
          
          {/* Status Dropdown */}
          <select 
            className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Yet to Start">Yet to Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Approval Pending">Approval Pending</option>
            <option value="Auto-submitted">Auto-submitted</option>
          </select>
          
          {/* Reset Filter */}
          {statusFilter !== 'all' && (
            <button 
              onClick={resetFilter}
              className="flex items-center gap-1 text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
            >
              <span>Reset filter</span>
            </button>
          )}
        </div>
        
        {/* Center - Reports_Data Badge */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-400 px-4 py-1.5 rounded">
            <span className="text-white font-medium text-sm">QLQD_Sales</span>
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Reset All Filters */}
          <button 
            onClick={resetFilter}
            className="flex items-center gap-1 text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors px-2 py-1 border border-gray-300 rounded-md"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
          
          {/* Excel Export */}
          <div className="bg-green-100 p-2 rounded-md cursor-pointer hover:bg-green-200 transition-colors">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-blue-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700 text-sm">Dealer ID</th>
              <th className="text-left p-3 font-semibold text-gray-700 text-sm">Dealer Name</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Auditor Status</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Reviewer Status</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Score</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Action Plan Open</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Action Plan Closed</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Action Plan Summary</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">Action</th>
              <th className="text-center p-3 font-semibold text-gray-700 text-sm">View</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
                }`}
              >
                <td className="p-3 font-medium text-gray-700 text-sm">{row.id}</td>
                <td className="p-3 text-gray-700 text-sm">{row.dealerName}</td>
                <td className="p-3 text-center">
                  {getStatusBadge(row.auditorStatus, 'auditor')}
                </td>
                <td className="p-3 text-center">
                  {getStatusBadge(row.reviewerStatus, 'reviewer')}
                </td>
                <td className="p-3 text-center text-blue-600 font-medium text-sm">{row.score}</td>
                <td className="p-3 text-center text-gray-700 text-sm">{row.actionPlanOpen}</td>
                <td className="p-3 text-center text-gray-700 text-sm">{row.actionPlanClosed}</td>
                <td className="p-3 text-center">
                  <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium inline-block">
                    {row.actionPlanSummary}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button className="text-gray-600 hover:text-gray-800 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="relative p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2023 TVS Motor Company. All Rights Reserved
          </p>
        </div>
        
        <div className="absolute bottom-4 right-6 text-xs text-gray-500">
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Privacy Policy</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Terms & Conditions</span>
          <span className="mx-1">|</span>
          <span className="cursor-pointer hover:underline hover:text-gray-700 transition-colors">Warranty T&C</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsAuditsTable;
