import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/reports',
    },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex-shrink-0 transition-all duration-300 ease-in-out">
      <nav className="mt-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive
                    ? 'bg-blue-600 text-white border-r-2 border-blue-600'
                    : 'text-gray-700'
                }`
              }
            >
              <div className="flex items-center">
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </div>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
