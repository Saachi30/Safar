import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
      <ul className="py-1">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/logout"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
