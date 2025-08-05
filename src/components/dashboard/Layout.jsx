import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/dashboardSlice';
import Sidebar from './Sidebar';
import logo from '../../assets/header-logo.svg';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.dashboard);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <header className="bg-blue-600 text-white px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div 
              className="flex items-center justify-center cursor-pointer hover:bg-blue-700 rounded-lg p-1 transition-colors"
              onClick={handleSidebarToggle}
              title="Toggle Sidebar"
            >
              <img src={logo} alt="TVS Logo" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain" />
            </div>
          </div>
          {/* Search Bar - Hidden on mobile */}
          <div className="relative max-w-md flex-1 hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-gray-900 pl-10 pr-4 py-1.5 rounded-[19px] w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ height: '38px' }}
            />
          </div>
        </div>
        {/* Right side - Responsive */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <div className="relative">
            <Bell className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer" onClick={handleLogout}>
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-sm hidden sm:block">
              <div className="font-medium">{user?.name || 'User'}</div>
              <div className="text-blue-200 text-xs">{user?.role || 'Guest'}</div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex relative">
        {/* Sidebar with overlay for mobile */}
        {sidebarOpen && (
          <>
            {/* Mobile overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={handleSidebarToggle}
            />
            {/* Sidebar */}
            <div className={`fixed lg:relative z-30 lg:z-auto transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
              <Sidebar />
            </div>
          </>
        )}
        
        <main className={`flex-1 p-3 sm:p-4 lg:p-6 min-w-0 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-0' : 'ml-0'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
