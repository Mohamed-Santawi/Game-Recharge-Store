import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

const Header = () => {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");
  const mobileMenuRef = useRef(null);
  const languageDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Navigation items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
    { label: "Contact Us", path: "/contact" },
  ];

  // Add profile link for authenticated users
  if (currentUser) {
    navItems.push({ label: "Profile", path: "/profile" });
  }

  // Add admin link for users with admin role
  if (userData?.role === "admin") {
    navItems.push({ label: "Admin", path: "/admin" });
  }

  return (
    <header className="bg-white shadow-md overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              GameStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <span className="mr-2">{selectedLanguage}</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {["English", "Arabic"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                          // TODO: Implement language switching logic
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedLanguage === lang
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Button */}
            {currentUser ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div
            className={`md:hidden flex items-center z-50 relative ${
              isMobileMenuOpen ? "hidden" : "block"
            }`}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 -mr-2"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-6 h-full overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-600 hover:text-blue-600 p-2 mb-4 block w-full text-right"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>

          {/* Mobile Navigation Links */}
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Language Selection */}
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  // TODO: Implement language switching logic
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {["English", "Arabic"].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Auth Button */}
            <div className="border-t border-gray-200 pt-4">
              {currentUser ? (
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
