import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ServerIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  PlusIcon
} from '@heroicons/react/24/outline';
import rolitLogo from '../helpme.png';

// Define dropdown menu items
const productItems = [
  { name: 'AI Virtual Assistant', description: 'Create smarter marketing', icon: <PuzzlePieceIcon className="h-6 w-6" /> },
  { name: 'Analytics Dashboard', description: 'Track campaign performance', icon: <ServerIcon className="h-6 w-6" /> },
  { name: 'Content Creator', description: 'Automate content generation', icon: <CodeBracketIcon className="h-6 w-6" /> },
  { name: 'Social Media Integration', description: 'Connect all platforms', icon: <ShieldCheckIcon className="h-6 w-6" /> }
];

const resourceItems = [
  { name: 'Documentation', description: 'Platform guides and API docs' },
  { name: 'Tutorials', description: 'Step-by-step walkthroughs' },
  { name: 'Case Studies', description: 'Success stories and examples' },
  { name: 'Webinars', description: 'Live and recorded sessions' }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.product-menu-container')) {
        setIsProductMenuOpen(false);
      }
      if (!target.closest('.resources-menu-container')) {
        setIsResourcesMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section: Logo, nav and search */}
            <div className="flex items-center flex-1">
              {/* Mobile menu button */}
              <div className="mr-2 -ml-2 flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="h-12 flex items-center justify-center">
                  <img 
                    src={rolitLogo} 
                    alt="Rolit" 
                    className="h-full max-w-[140px] object-contain"
                  />
                </div>
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {/* Product Dropdown */}
                <div className="relative product-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProductMenuOpen(!isProductMenuOpen);
                      setIsResourcesMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
                    <span>Product</span>
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isProductMenuOpen && (
                    <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="px-4 py-3">
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tools</p>
                          <div className="mt-2 space-y-2">
                            {productItems.map((item, index) => (
                              <Link
                                key={index}
                                to="#"
                                className="group flex items-start p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                                  {item.icon}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <div className="px-4 py-3">
                          <div className="space-y-2">
                            <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                              About
                            </Link>
                            <Link to="/pricing" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                              Pricing
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Resources Dropdown */}
                <div className="relative resources-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsResourcesMenuOpen(!isResourcesMenuOpen);
                      setIsProductMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
                    <span>Resources</span>
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isResourcesMenuOpen && (
                    <div className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="px-4 py-3">
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Learn</p>
                          <div className="mt-2 space-y-2">
                            {resourceItems.map((item, index) => (
                              <Link
                                key={index}
                                to="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                              >
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <div className="px-4 py-3">
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connect</p>
                          <div className="mt-2 space-y-2">
                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                              Community Forum
                            </Link>
                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                              Events
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link
                  to="/marketplace"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Marketplace
                </Link>
                
                <Link
                  to="/pricing"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Pricing
                </Link>
              </div>
              
              {/* Search Bar */}
              <div className="flex-grow max-w-xl ml-6">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search or jump to..."
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-1.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                      <kbd className="inline-flex items-center rounded border border-gray-200 dark:border-gray-600 px-1 text-xs text-gray-500 dark:text-gray-400">
                        /
                      </kbd>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right section: user controls */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              
              {user ? (
                <>
                  {/* Create New Button */}
                  <div className="relative">
                    <button className="flex items-center ml-2 px-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <PlusIcon className="h-5 w-5" />
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                  </div>
                
                  {/* Notifications */}
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative">
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative ml-3 user-menu-container">
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(!isUserMenuOpen);
                        }}
                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        id="user-menu-button"
                        aria-expanded={isUserMenuOpen}
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        {user.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={user.avatar}
                            alt={user.name}
                          />
                        ) : (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                    
                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                          </div>
                          
                          <Link
                            to={`/${user.role}/profile`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserCircleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Your Profile
                          </Link>
                          
                          <Link
                            to={`/${user.role}/dashboard`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <BuildingOffice2Icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Dashboard
                          </Link>
                          
                          <Link
                            to={`/${user.role}/settings`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Settings
                          </Link>
                          
                          <Link
                            to="/docs"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <BookOpenIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Documentation
                          </Link>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              <Link
                to="/resources"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              
              <Link
                to="/marketplace"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              
              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              {user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                    <div className="px-3 space-y-1">
                      <Link
                        to={`/${user.role}/dashboard`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <Link
                        to={`/${user.role}/profile`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      
                      <Link
                        to={`/${user.role}/settings`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {!user && (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">Account</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Manage your account</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
