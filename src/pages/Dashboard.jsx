import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Eye, UserCheck, Building } from 'lucide-react';
import { setFilters } from '../store/slices/dashboardSlice';
import MetricCard from '../components/dashboard/MetricCard';
import ReviewerStatusCard from '../components/dashboard/ReviewerStatusCard';
import ReviewerStatusChart from '../components/dashboard/ReviewerStatusVerticalChart';
import AuditorStatusChart from '../components/dashboard/AuditorStatusChart';
import Layout from '../components/dashboard/Layout';
import ChecksheetStatus from '../components/dashboard/ChecksheetStatus';
import AuditsTable from '../components/dashboard/AuditsTable';

const Dashboard = () => {
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex-shrink-0">Dashboard</h1>
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
        
        {/* Dealer Audit Status Section - Responsive */}
        <div className="bg-blue-100 rounded-lg p-3 sm:p-4 lg:p-6 border border-blue-200 mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Dealer Audit Status</h2>
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
        
        {/* Main dashboard area - Responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-4 lg:gap-6 mt-6">
          {/* Main status cards - responsive columns */}
          <div className="lg:col-span-12 xl:col-span-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="flex flex-col items-center">
                <span className="text-sm lg:text-lg font-semibold text-gray-800 mb-2 lg:mb-3">Auditor Status</span>
                <AuditorStatusChart />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm lg:text-lg font-semibold text-gray-800 mb-2 lg:mb-3">Reviewer Status</span>
                <ReviewerStatusChart />
              </div>
              <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1">
                <span className="text-sm lg:text-lg font-semibold text-gray-800 mb-2 lg:mb-3">Checksheet Status</span>
                <ChecksheetStatus />
              </div>
            </div>
          </div>
          {/* Metric cards - responsive positioning */}
          <div className="lg:col-span-12 xl:col-span-2">
            <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-1 gap-3 lg:gap-4 xl:justify-end xl:items-end h-full">
              <div className="w-full max-w-[160px] xl:max-w-none">
                <MetricCard
                  title="Total Users"
                  value={metrics.totalUsers}
                  icon={Users}
                  bgColor="bg-teal-500"
                  textColor="text-white"
                />
              </div>
              <div className="w-full max-w-[160px] xl:max-w-none">
                <MetricCard
                  title="Total Reviewers"
                  value={metrics.totalReviewers}
                  icon={Eye}
                  bgColor="bg-purple-500"
                  textColor="text-white"
                />
              </div>
              <div className="w-full max-w-[160px] xl:max-w-none">
                <MetricCard
                  title="Total Auditor"
                  value={metrics.totalAuditors}
                  icon={UserCheck}
                  bgColor="bg-orange-500"
                  textColor="text-white"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Audits table below both, compact spacing */}
        <div className="mt-6">
          <AuditsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
