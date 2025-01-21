import { X } from "lucide-react";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow, BiCamera, BiVideo } from "react-icons/bi";

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const totalImages = images?.length || 0;
  const videoCount = 1; // ভিডিও এর সংখ্যা (ডাইনামিক করলে এখানে পরিবর্তন করবেন)

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? totalImages - 1 : prevIndex - 1
      );
    } else {
      setImageIndex((prevIndex) =>
        prevIndex === totalImages - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex gap-4">
      {/* Modal Image Viewer */}
      {imageIndex !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <button
            onClick={() => setImageIndex(null)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={() => changeSlide("left")}
            className="absolute left-4 md:left-8 bg-white bg-opacity-70 rounded-full p-3 shadow-md hover:bg-opacity-90 transition"
          >
            <BiLeftArrow size={30} />
          </button>
          <button
            onClick={() => changeSlide("right")}
            className="absolute right-4 md:right-8 bg-white bg-opacity-70 rounded-full p-3 shadow-md hover:bg-opacity-90 transition"
          >
            <BiRightArrow size={30} />
          </button>

          {/* Full Screen Image */}
          <img
            className="max-w-full w-full max-h-[80vh] object-contain rounded-lg"
            src={images[imageIndex]}
            alt={`Slide ${imageIndex + 1}`}
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 bg-rose-500 text-white px-6 py-2 rounded-md font-semibold text-sm">
            {imageIndex + 1} of {totalImages}
          </div>
        </div>
      )}

      {/* Main Image Section */}
      <div className="flex-[4] cursor-pointer">
        <img
          onClick={() => setImageIndex(0)}
          className="w-full h-full object-cover rounded-lg"
          src={images[0]}
          alt="Main"
        />
      </div>

      {/* Thumbnail Section */}
      <div className="hidden md:flex flex-[2] flex-col justify-between gap-2">
        {images?.slice(1, 3).map((image, index) => (
          <img
            onClick={() => setImageIndex(index + 1)}
            key={index}
            className="w-full h-[49%] object-cover rounded-lg cursor-pointer"
            src={image}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>

      {/* Image and Video Count Overlay */}
      <div className="absolute bottom-3 right-3 bg-white rounded-md px-4 py-2 shadow-lg flex items-center space-x-3 text-black z-20">
        <div className="flex items-center space-x-1">
          <BiCamera />
          <span>{`1/${totalImages}`}</span>
        </div>
        <div className="border-l h-5 border-gray-400 mx-2"></div>
        {/* <div className="flex items-center space-x-1">
          <BiVideo />
          <span>{videoCount}</span>
        </div> */}
      </div>
    </div>
  );
};

export default ImageSlider;
