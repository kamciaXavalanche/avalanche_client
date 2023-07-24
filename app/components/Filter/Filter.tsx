import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface FilterProps {
  title: string;
  subitems: string[];
  activeParams: string[];
  setActiveParams: (param: any) => void;
  setCategory: (param: any) => void;
}

const Filter: React.FC<FilterProps> = ({
  title,
  subitems,
  activeParams,
  setActiveParams,
  setCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempParams, setTempParams] = useState<string[]>(activeParams); // Tymczasowa tablica wybranych parametrów
  const [openSubmenu, setOpensubmenu] = useState(false);

  const handleClick = (item: string) => {
    // Aktualizacja tymczasowej tablicy tempParams przy kliknięciu subitemu
    if (!tempParams.includes(item)) {
      setTempParams((prev) => [...prev, item]);
    } else {
      setTempParams((prev) => prev.filter((param) => param !== item));
    }
  };

  const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Zapobiegamy domyślnemu działaniu submita
    // Zastosowanie filtrowania tylko po kliknięciu "apply"
    setActiveParams(tempParams);
    setCategory(tempParams);
    setIsOpen(false); // Zamknięcie formularza po kliknięciu "apply"
  };

  console.log(subitems);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center mb-2 py-2 px-6 w-[200px] bg-gray-200 border border-black text-black hover:text-white hover:bg-black cursor-pointer"
      >
        <div>{title.toUpperCase()}</div>
        <div>
          <BsChevronDown />
        </div>
      </div>
      {isOpen && subitems && subitems.length > 0 && (
        <form
          className="absolute z-20 h-fit w-full bg-white border px-4 py-3 flex flex-col gap-2"
          onSubmit={handleApply} // Obsługa submita formularza
        >
          {subitems.map((item) => (
            <div
              key={item.title}
              onClick={() => handleClick(item.title)}
              className="flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`w-4 h-4 border border-black ${
                    tempParams.includes(item.title) && "bg-black"
                  } `}
                />
                <p
                  onClick={() => setOpensubmenu((prev) => !prev)}
                  className="uppercase"
                >
                  {item.title} +{" "}
                </p>
              </div>
              {openSubmenu && (
                <div className="pl-6 flex flex-col gap-2">
                  {item.subcategories.data.map((subcategory) => {
                    return (
                      <div className="flex gap-1 items-center">
                        <div className={`w-4 h-4 border border-black  `} />
                        <p>{subcategory.attributes.name} </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-black text-white uppercase text-center w-full py-1 mt-3"
          >
            apply
          </button>
        </form>
      )}
    </div>
  );
};

export default Filter;
