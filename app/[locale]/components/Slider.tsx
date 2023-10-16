"use client";


const Slider = ({ images }) => {
  // Check if images is provided and not empty
  const largeImages = images && images.length > 0 ? images[0]?.attributes.ImagesXL.data : [];

  const [slideIndex, setSlideIndex] = useState(0);
  const slideNumber = 2;

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % slideNumber);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + slideNumber) % slideNumber);
  };

  return (
    <div className="w-full group h-[600px] overflow-hidden relative">
      <div
        className="w-full h-full flex transition-all duration-700 ease-in-out "
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {largeImages.map((image) => (
          <div
            key={image.attributes.url}
            style={{
              backgroundImage: `url('${image.attributes.url}')`,
            }}
            className="w-full h-full flex-shrink-0 bg-cover lg:bg-center relative "
          >
            <div className="absolute w-full h-full bg-black/10"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-end justify-center gap-6 z-20">
        {largeImages.map((image, index) => (
          <div
            key={image.attributes.url}
            onClick={() => setSlideIndex(index)}
            className={`mb-6 w-3.5 h-3.5 rounded-full cursor-pointer ${
              index === slideIndex ? "bg-gray-200" : "border"
            }`}
          />
        ))}
      </div>
      <div className="hidden group-hover:flex absolute inset-0  justify-between items-center px-6 lg:px-8">
        <BsChevronLeft
          onClick={prevSlide}
          className="cursor-pointer z-20 w-7 lg:w-14 lg:h-14 h-7 fill-gray-200 bg-black border-2 p-1 border-gray-200"
        />
        <BsChevronRight
          onClick={nextSlide}
          className="cursor-pointer z-20 w-7 lg:w-14 lg:h-14  h-7 fill-gray-200 bg-black border-2 p-1 border-gray-200"
        />
      </div>
    </div>
  );
};

export default Slider;
