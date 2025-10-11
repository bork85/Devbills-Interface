import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

interface navLinks {
  name: string;
  path: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { authState, logout } = useAuth();
  const { pathname } = useLocation();
  const isAuthenticated: boolean = !!authState.user;

  const navLink: navLinks[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" },
  ];

  const renderAvatar = () => {
    if (!authState.user) return null;
    if (authState.user.photoUrl) {
      return (
        <img
          src={authState.user.photoUrl}
          alt={`Avatar de ${authState.user.displayName}`}
          className="w-8 h-8 rounded-full border border-gray-500"
        />
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full border border-gray-500 bg-gray-800 text-primary-500 font-bold">
          {authState.user.displayName?.charAt(0)}
        </div>
      );
    }
  };

  const handleLogOut = (): void => {
    logout();
  };

  const changeMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container-app">
        <div className="flex justify-between items-center py-4">
          {/* LOGO */}
          <Link to="/" className="flex gap-2 text-2xl text-primary-500 items-center font-bold">
            <Activity className="w-8 h-8" />
            DevBills
          </Link>

          {/* MENU DESKTOP */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-3 transition-all">
              {navLink.map((link) => (
                <Link
                  to={link.path}
                  key={link.path}
                  className={
                    pathname === link.path
                      ? "text-primary-500 bg-primary-500/10 rounded-md h-10 px-3 py-2"
                      : "text-gray-400 rounded-md h-10 px-3 py-2 hover:bg-primary-500/10 hover:text-primary-500"
                  }
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
          {/* USER INFO & LOGOUT */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {renderAvatar()}
                  <span className="text-sm font-medium">{authState.user?.displayName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="flex items-center justify-center p-2  hover:bg-red-300 h-9 w-9 rounded-full transition-all"
                >
                  <LogOut className="text-gray-400 hover:text-red-700 transition-all" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <LogIn className="w-5 h-5bg-primary-500 text-gray-800 font-semibold px-5 py-2.5 ronded-xl flex items-center justify-center hover:bg-primary-500/65" />
              </Link>
            )}
          </div>
          {/* BOTÃO MENU MOBILE */}
          <button
            type="button"
            onClick={changeMenu}
            className="text-gray-400 p-2 rounded-lg hover:bg-gray-800 transition-colors md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div>
          <div>
            {isAuthenticated ? (
              <>
                <nav className="space-y-1">
                  {navLink.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-3 py-2 rounded-lg 
                    ${
                      pathname === link.path
                        ? "bg-gray-800 text-primary-500 font-medium"
                        : "text-gray-400 hover:bg-gray-800 hover:text-primary-500"
                    }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <div className="flex items-center justify-between py-2 px-4 gap-2">
                    {renderAvatar()}
                    <span>{authState.user?.displayName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className="flex items-center justify-center p-2 hover:bg-red-300 h-9 w-9 rounded-full transition-all"
                  >
                    <LogOut className="text-gray-400 hover:text-red-700 transition-all" />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={()=>setIsOpen(false)}>
                <LogIn                 
                className="w-5 h-5bg-primary-500 text-gray-800 font-semibold px-5 py-2.5 ronded-xl flex items-center justify-center hover:bg-primary-500/65" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
