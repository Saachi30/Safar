import React from "react";
import kerala from "../../assets/AIKerala.webp";


function Popular() {
  const packages = [
    { name: "Lakshadweep", image: "https://www.fabhotels.com/blog/wp-content/uploads/2024/01/bbec4647-lakshadweep-1.jpg" },
    { name: "Himachal Pradesh", image: "https://www.fabhotels.com/blog/wp-content/uploads/2024/02/b39a81e3-himachal-pradesh.jpg" },
    { name: "Kedarnath", image: "https://uttarakhandtourism.gov.in/sites/default/files/2020-09/Kedarnath%20Temple.jpg" },
    { name: "Bali", image: "https://digital.ihg.com/is/image/ihg/intercontinental-bali-9719167392-2x1" },
    {
      name: "Jaipur",
      image:
        "https://media.istockphoto.com/id/1135820309/photo/amber-fort-and-maota-lake-jaipur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=raUKDB1Mris9Z7SjvuuTieZRzF2-CaKukGvTC8t1kuo=",
    },
    { name: "Kashmir", image: "https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg" },
    { name: "Agra", image: "https://cdn.britannica.com/25/155325-050-79CFFB62/Taj-Mahal-Agra-India.jpg" },
    { name: "Kaziranga", image: "https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2022/08/kaziranga-wildlife-2.jpg" },
    { name: "Goa", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=600&h=500&s=1" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
    { name: "Kerala", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg?size=690:388" },
  ];

  // Split packages into chunks of 10 items
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const packagesChunks = chunkArray(packages, 10);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative top-[50%] transform -translate-y-1/2 flex h-15 max-w-[60rem] justify-center items-center bg-gray-50 rounded-full px-8 py-2 shadow-md">
        <ul className="flex flex-row space-x-24 justify-center items-center w-full">
          <li className="flex flex-row justify-center items-center space-x-2">
            <img
              className="rounded-full h-[3rem] w-[3rem]"
              src={kerala}
              alt=""
            />
            <h2>Honeymoon</h2>
          </li>
          <li className="flex flex-row justify-center items-center space-x-2">
            <img
              className="rounded-full h-[3rem] w-[3rem]"
              src={kerala}
              alt=""
            />
            <h2>Pilgrimage</h2>
          </li>
          <li className="flex flex-row justify-center items-center space-x-2">
            <img
              className="rounded-full h-[3rem] w-[3rem]"
              src={kerala}
              alt=""
            />
            <h2>Adventure</h2>
          </li>
          <li className="flex flex-row justify-center items-center space-x-2">
            <img
              className="rounded-full h-[3rem] w-[3rem]"
              src={kerala}
              alt=""
            />
            <h2>Group</h2>
          </li>
          <li className="flex flex-row justify-center items-center space-x-2">
            <img
              className="rounded-full h-[3rem] w-[3rem]"
              src={kerala}
              alt=""
            />
            <h2>Leisure</h2>
          </li>
        </ul>
      </div>

      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Popular <span className="text-orange-500">Packages</span>
        </h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex flex-col space-y-20 px-10">
            {packagesChunks.map((chunk, rowIndex) => (
              <div key={rowIndex} className="flex space-x-10">
                {chunk.map((pkg, index) => (
                  <div
                    key={index}
                    className="relative transition-transform duration-300 hover:scale-105 min-w-[14%] h-[18rem] rounded-tl-lg rounded-tr-lg rounded-bl-3xl rounded-br-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-75 text-white text-center py-2">
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Popular;
