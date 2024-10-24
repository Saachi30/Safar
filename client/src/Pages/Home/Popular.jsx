import React, { useState } from "react";
import kerala from "../../assets/AIKerala.webp";
import { Users, Clock } from "lucide-react";

function Popular() {
  const packages = [
    { 
      name: "Lakshadweep", 
      image: "https://www.fabhotels.com/blog/wp-content/uploads/2024/01/bbec4647-lakshadweep-1.jpg",
      price: "35,000",
      duration: "6 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Himachal Pradesh", 
      image: "https://www.fabhotels.com/blog/wp-content/uploads/2024/02/b39a81e3-himachal-pradesh.jpg",
      price: "28,000",
      duration: "4 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Kedarnath", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxW33faZi-REGBj2wU7q5RwfuN-bmnqGHdg&s",
      price: "22,000",
      duration: "5 Days",
      groupSize: "20+",
      location: "India"
    },
    { 
      name: "Bali", 
      image: "https://digital.ihg.com/is/image/ihg/intercontinental-bali-9719167392-2x1",
      price: "75,000",
      duration: "7 Days",
      groupSize: "10+",
      location: "Indonesia"
    },
    { 
      name: "Jaipur", 
      image: "https://media.istockphoto.com/id/1135820309/photo/amber-fort-and-maota-lake-jaipur-rajasthan-india.jpg",
      price: "25,000",
      duration: "4 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Kashmir", 
      image: "https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg",
      price: "32,000",
      duration: "6 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Agra", 
      image: "https://cdn.britannica.com/25/155325-050-79CFFB62/Taj-Mahal-Agra-India.jpg",
      price: "18,000",
      duration: "3 Days",
      groupSize: "20+",
      location: "India"
    },
    { 
      name: "Kaziranga", 
      image: "https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2022/08/kaziranga-wildlife-2.jpg",
      price: "24,000",
      duration: "4 Days",
      groupSize: "12+",
      location: "India"
    }
  ];

  const packagesRow2 = [
    { 
      name: "Goa", 
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=600&h=500&s=1",
      price: "30,000",
      duration: "5 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Kerala", 
      image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg",
      price: "32,000",
      duration: "6 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Manali", 
      image: "https://images.thrillophilia.com/image/upload/s--YDLtx4Rr--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/113/611/original/1554458954_manali_honeymoon_places.jpg.jpg",
      price: "26,000",
      duration: "5 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Shimla", 
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Shimla_the_Mall_during_snowfall.jpg/1200px-Shimla_the_Mall_during_snowfall.jpg",
      price: "24,000",
      duration: "4 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Darjeeling", 
      image: "https://static.toiimg.com/photo/msid-106800822,width-96,height-65.cms",
      price: "28,000",
      duration: "5 Days",
      groupSize: "12+",
      location: "India"
    },
    { 
      name: "Munnar", 
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg",
      price: "25,000",
      duration: "4 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Ooty", 
      image: "https://static.theprint.in/wp-content/uploads/2021/06/ooty.jpg",
      price: "23,000",
      duration: "4 Days",
      groupSize: "15+",
      location: "India"
    },
    { 
      name: "Coorg", 
      image: "https://www.holidify.com/images/bgImages/COORG.jpg",
      price: "27,000",
      duration: "5 Days",
      groupSize: "15+",
      location: "India"
    }
  ];

  const PackageCard = ({ pkg }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="flex-none w-[250px] relative transition-all duration-300 hover:scale-105 h-[18rem] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        
        <div 
          className={`absolute bottom-0 w-full bg-black bg-opacity-75 text-white transition-all duration-300  ${
            isHovered ? 'h-[55%]' : 'h-16'
          }`}
        >
          <h3 className="text-lg font-semibold text-center py-4">{pkg.name}</h3>
          
          <div className={`px-4 transition-opacity duration-300  ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="mt-1 space-y-1">
              <div className="text-sm font-bold">
                Rs. {pkg.price}
                <span className="text-sm font-normal">/ Per Person</span>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span>{pkg.duration}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users size={20} />
                <span>{pkg.groupSize}</span>
              </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">📍 {pkg.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Categories Section */}
      <div className="relative top-[50%] transform -translate-y-1/2 flex h-15 max-w-[60rem] justify-center items-center bg-gray-50 rounded-full px-8 py-2 shadow-md">
        <ul className="flex flex-row space-x-24 justify-center items-center w-full">
          {["Honeymoon", "Pilgrimage", "Adventure", "Group", "Leisure"].map((category) => (
            <li key={category} className="flex flex-row justify-center items-center space-x-2">
              <img className="rounded-full h-[3rem] w-[3rem]" src={kerala} alt="" />
              <h2>{category}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Popular <span className="text-orange-500">Packages</span>
        </h2>
        
        {/* First Row */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 px-4 min-w-full">
            {packages.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 px-4 min-w-full">
            {packagesRow2.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;