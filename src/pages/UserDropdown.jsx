import { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const UserDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  return (
    <div className="fixed top-4 right-4">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <User className="h-8 w-8 text-gray-700" />
          <span className="text-gray-700">{currentUser.email}</span>
        </button>
        
        {showDropdown && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
