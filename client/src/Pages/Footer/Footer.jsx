import React from 'react'

function Footer() {
  return (
    <div className="bg-orange-400 text-white px-14 pt-20 pb-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      
        <div>
          <h2 className="text-2xl font-bold mb-4">Travel</h2>
          <p className="text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
           
          </div>
        </div>

        {/* Services Section */}
        <div className='col-span-auto'>
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Destinations</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Our Blog</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Instagram</h2>
          <div className="grid grid-cols-3 gap-2">
            <img src="https://www.fabhotels.com/blog/wp-content/uploads/2024/01/bbec4647-lakshadweep-1.jpg" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
            <img src="https://www.fabhotels.com/blog/wp-content/uploads/2024/02/b39a81e3-himachal-pradesh.jpg" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
            <img src="https://uttarakhandtourism.gov.in/sites/default/files/2020-09/Kedarnath%20Temple.jpg" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
            <img src="https://digital.ihg.com/is/image/ihg/intercontinental-bali-9719167392-2x1" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
            <img src="https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
            <img src="https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg" alt="Instagram" className="rounded-md h-[5rem] w-[5rem]" />
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i> 
              Anyware, any rode, nr xyz, India
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone-alt mr-2"></i> 
              +91 9876543210
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope mr-2"></i> 
              email@example.com
            </li>
          </ul>
        </div>
      </div>
      {/* Footer Bottom Text */}
      <div className="text-center mt-10 text-sm">
        traveltour©2024 all rights reserved
      </div>
    </div>
  );
}
export default Footer