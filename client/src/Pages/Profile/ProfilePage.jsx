import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, MapPin, User, UserPlus } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src="/api/placeholder/200/200"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-500">
            <User size={18} className="inline-block mr-2" />
            johndoe@example.com
          </p>
          <p className="text-gray-500">
            <MapPin size={18} className="inline-block mr-2" />
            San Francisco, CA
          </p>
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">Upcoming Trips</h3>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-500" />
                <span>Hawaii</span>
              </div>
              <div className="text-gray-500">Feb 15 - Feb 22</div>
            </li>
            <li>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-500" />
                <span>Paris</span>
              </div>
              <div className="text-gray-500">May 1 - May 10</div>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Connections</h3>
          <div className="flex items-center space-x-2">
            <UserPlus size={18} className="text-blue-500" />
            <span>2 new connection requests</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Mail size={18} className="text-blue-500" />
            <span>3 new messages</span>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex justify-end">
        <Link to="/settings" className="text-blue-500 hover:underline">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;