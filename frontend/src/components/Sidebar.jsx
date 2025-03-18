import React, { useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiBookOpen, FiTrendingUp, FiBarChart2, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { IoIosLogOut } from "react-icons/io";
import { PiExam } from "react-icons/pi";
import { Tooltip, Transition } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const sidebarWidth = isOpen ? 240 : 70;
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  // For mobile responsiveness - closes sidebar when clicking outside
  const sidebarRef = useClickOutside(() => {
    if (window.innerWidth < 768 && isOpen) {
      setIsOpen(false);
    }
  });

  // Logout function
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileCompleted");
    navigate("/login");
  };

  const links = [
    { path: '/', icon: <FiHome size={20} />, tooltip: 'Home' },
    { path: '/profile', icon: <FiUser size={20} />, tooltip: 'Profile' },
    { path: '/learning-path', icon: <FiBookOpen size={20} />, tooltip: 'Learning Path' },
    { path: '/market-trends', icon: <FiTrendingUp size={20} />, tooltip: 'Market Trends' },
    { path: '/recommendations', icon: <FiBarChart2 size={20} />, tooltip: 'Recommendations' },
    { path: '/courses', icon: <FiBookOpen size={20} />, tooltip: 'Courses' },
    { path: '/quiz-selection', icon: <PiExam size={20} />, tooltip: 'Skill Challenge' },
  ];

  // CSS classes using string literals instead of createStyles
  const sidebarClass = `fixed left-0 top-0 h-screen bg-gray-900 text-white flex flex-col py-4 z-10 transition-all duration-300 ease-in-out shadow-lg ${
    isOpen ? 'w-60' : 'w-[70px]'
  }`;

  const toggleButtonClass = `bg-transparent border-0 text-white cursor-pointer p-3 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-150 hover:bg-gray-800`;

  const getLinkClass = (path) => {
    const baseClass = "flex items-center p-3 mx-3 my-1 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white";
    const activeClass = location.pathname === path ? "bg-gray-800 border-l-4 border-blue-500 text-white" : "";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <>
      <Transition
        mounted={true}
        transition="fade"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <div
            ref={sidebarRef}
            className={sidebarClass}
            style={styles}
          >
            <button 
              onClick={toggleSidebar} 
              className={toggleButtonClass}
              aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            <div className="flex flex-col space-y-1">
              {links.map((link, index) => (
                <Tooltip
                  key={index}
                  label={link.tooltip}
                  position="right"
                  disabled={isOpen}
                  withArrow
                >
                  <Link
                    to={link.path}
                    className={getLinkClass(link.path)}
                  >
                    <span className="min-w-[24px] flex items-center justify-center">
                      {link.icon}
                    </span>
                    <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
                      isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                    }`}>
                      {link.tooltip}
                    </span>
                  </Link>
                </Tooltip>
              ))}
            </div>

            <div className="mt-auto mb-4 px-3">
              <Tooltip
                label="Logout"
                position="left"
                disabled={isOpen}
                withArrow
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 mx-3 my-1 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white w-full"
                >
                  <span className="min-w-[24px] flex items-center justify-center">
                  <IoIosLogOut size={20} />
                  </span>
                  <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${
                    isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    Logout
                  </span>
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      </Transition>
      
      {/* This div ensures content is pushed to the right of the sidebar */}
      <div 
        className="transition-all duration-300 ease-in-out" 
        style={{ 
          marginLeft: `${sidebarWidth}px`,
          width: `calc(2% - ${sidebarWidth}px)`
        }}
      >
        {/* Your main content will go here */}
      </div>
    </>
  );
};

export default Sidebar;