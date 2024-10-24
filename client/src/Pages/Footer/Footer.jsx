import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const socialIcons = [
    { name: 'twitter', icon: faTwitter },
    { name: 'youtube', icon: faYoutube },
    { name: 'facebook', icon: faFacebook },
    { name: 'instagram', icon: faInstagram }
  ];

  return (
    <div className="bg-orange-400 text-white px-14 py-16">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Travel Section - 30% */}
        <div className="md:w-[30%]">
          <h2 className="text-2xl font-bold mb-6">Travel</h2>
          <p className="text-sm mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-4">
            {socialIcons.map((social) => (
              <div key={social.name} className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={social.icon}
                  className="text-orange-400 text-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Services Section - 15% */}
        <div className="md:w-[15%]">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Destinations</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Our Blog</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Instagram Section - 30% */}
        <div className="md:w-[30%]">
          <h2 className="text-2xl font-bold mb-6">Instagram</h2>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-20 w-20 overflow-hidden rounded-lg">
                <img 
                  src="https://www.fabhotels.com/blog/wp-content/uploads/2024/01/bbec4647-lakshadweep-1.jpg"
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section - 25% */}
        <div className="md:w-[25%]">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-2">
              <span className="mt-1">📍</span>
              <span>Anywhere, Any road, nr xyz, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✉️</span>
              <span>info@example.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-16 pt-8 border-t border-white/20">
        traveltoor©2024 all rights reserved
      </div>
    </div>
  );
}

export default Footer;
