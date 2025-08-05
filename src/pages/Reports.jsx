import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Eye, UserCheck, Building } from 'lucide-react';
import { setFilters } from '../store/slices/dashboardSlice';
import MetricCard from '../components/dashboard/MetricCard';
import Layout from '../components/dashboard/Layout';
import ReportsAuditsTable from '../components/reports/ReportsAuditsTable';

const Reports = () => {
  const dispatch = useDispatch();
  const { metrics, filters, loading, error } = useSelector((state) => state.dashboard);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  return (
    <Layout>
      <div className="pt-2 px-2 sm:px-4 lg:px-6">
        {/* Header - Responsive */}
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex-shrink-0">Reports</h1>
            {/* Filters row - Responsive */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:flex-1 overflow-x-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Department</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="sales">Sales</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Region</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <option value="">Select Region</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
                <span className="font-medium text-gray-700 whitespace-nowrap text-sm">Country</span>
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 shadow-sm focus:outline-none w-full sm:w-32 lg:w-44"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reports Audit Status Section - Responsive */}
        <div className="bg-blue-100 rounded-lg p-3 sm:p-4 lg:p-6 border border-blue-200 mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Reports Audit Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Select Audit */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Audit</option>
                <option value="audit1">Audit 1</option>
                <option value="audit2">Audit 2</option>
                <option value="audit3">Audit 3</option>
              </select>
            </div>

            {/* Select Audit Month */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Audit Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>

            {/* Select Zone */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Zone</option>
                <option value="north">North Zone</option>
                <option value="south">South Zone</option>
                <option value="east">East Zone</option>
                <option value="west">West Zone</option>
                <option value="central">Central Zone</option>
              </select>
            </div>

            {/* Select Area */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Area</option>
                <option value="area1">Area 1</option>
                <option value="area2">Area 2</option>
                <option value="area3">Area 3</option>
                <option value="area4">Area 4</option>
              </select>
            </div>

            {/* Select Territory */}
            <div className="flex flex-col">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full">
                <option value="">Select Territory</option>
                <option value="territory1">Territory 1</option>
                <option value="territory2">Territory 2</option>
                <option value="territory3">Territory 3</option>
                <option value="territory4">Territory 4</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Status sections and metric cards in same row */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left side - Status sections */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Auditor Status - No header, 2x2 grid */}
            <div className="bg-white rounded-lg shadow-sm border p-4 min-w-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">50</div>
                  <span className="text-xs text-gray-600 truncate">Action Plan Pending</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">20</div>
                  <span className="text-xs text-gray-600 truncate">Audit in Progress</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">30</div>
                  <span className="text-xs text-gray-600 truncate">Completed</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">20</div>
                  <span className="text-xs text-gray-600 truncate">Not Started</span>
                </div>
              </div>
            </div>

            {/* Reviewer Status - No header, 2x2 grid */}
            <div className="bg-white rounded-lg shadow-sm border p-4 min-w-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">50</div>
                  <span className="text-xs text-gray-600 truncate">Auto Submitted</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">30</div>
                  <span className="text-xs text-gray-600 truncate">Approval in Progress</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">30</div>
                  <span className="text-xs text-gray-600 truncate">Approved</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">20</div>
                  <span className="text-xs text-gray-600 truncate">Approval Pending</span>
                </div>
              </div>
            </div>

            {/* Checksheet Status - No header, 2x2 grid */}
            <div className="bg-white rounded-lg shadow-sm border p-4 min-w-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">30</div>
                  <span className="text-xs text-gray-600 truncate">Reviewed</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">20</div>
                  <span className="text-xs text-gray-600 truncate">Completed</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">20</div>
                  <span className="text-xs text-gray-600 truncate">Pending</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">50</div>
                  <span className="text-xs text-gray-600 truncate">Alloted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Metric cards (smaller size) */}
          <div className="flex-shrink-0 w-full lg:w-80 xl:w-96">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              <div className="w-full">
                <div className="bg-teal-500 text-white rounded-lg p-4 shadow-sm h-24 flex flex-col items-center justify-center">
                  <Building className="w-6 h-6 mb-1" />
                  <div className="text-xl font-bold">130</div>
                  <div className="text-xs opacity-90 text-center">Total Dealers</div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-orange-500 text-white rounded-lg p-4 shadow-sm h-24 flex flex-col items-center justify-center">
                  <Eye className="w-6 h-6 mb-1" />
                  <div className="text-xl font-bold">56</div>
                  <div className="text-xs opacity-90 text-center">Audit not started</div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-blue-500 text-white rounded-lg p-4 shadow-sm h-24 flex flex-col items-center justify-center">
                  <UserCheck className="w-6 h-6 mb-1" />
                  <div className="text-xl font-bold">25</div>
                  <div className="text-xs opacity-90 text-center">Audit Started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Audits table below both, compact spacing */}
        <div className="mt-6">
          <ReportsAuditsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
