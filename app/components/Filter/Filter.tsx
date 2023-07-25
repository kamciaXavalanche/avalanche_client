import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiPlus, BiMinus } from "react-icons/bi";

interface Subcategory {
  id: string;
  attributes: {
    name: string;
  };
}

interface Category {
  title: string;
  subcategories: {
    data: Subcategory[];
  };
}

interface FilterProps {
  title: string;
  subitems: Category[];
  activeParams: string[];
  setActiveParams: (param: any) => void;
  setCategory: (param: any) => void;
  setSubcategory: (param: any) => void;
}
const Filter: React.FC<FilterProps> = ({
  title,
  subitems: category,
  activeParams,
  setActiveParams,
  setCategory,
  setSubcategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempParams, setTempParams] = useState<string[]>(activeParams);
  const [openSubmenu, setOpenSubmenu] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedSubitems, setSelectedSubitems] = useState<{
    [key: string]: string[];
  }>({});

  // console.log(selectedSubitems);

  const handleClick = (item: string) => {
    if (!tempParams.includes(item)) {
      setTempParams((prev) => [...prev, item]);
    } else {
      setTempParams((prev) => prev.filter((param) => param !== item));
    }

    handleToggleSubmenu(item); // Toggle the submenu for the main category
  };

  const handleToggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleSubitemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    categoryTitle: string,
    subitemName: string
  ) => {
    event.stopPropagation(); // Stop event propagation to prevent deselecting the main category
    setSelectedSubitems((prev) => ({
      ...prev,
      [categoryTitle]: prev[categoryTitle]
        ? prev[categoryTitle].includes(subitemName)
          ? prev[categoryTitle].filter((item) => item !== subitemName)
          : [...prev[categoryTitle], subitemName]
        : [subitemName],
    }));
  };

  const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveParams(tempParams);
    setCategory(tempParams);
    setSubcategory(selectedSubitems);
    setIsOpen(false);
  };

  // console.log(tempParams);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center mb-2 py-2 px-6 w-[200px] bg-gray-200 border border-black text-black hover:text-white hover:bg-black cursor-pointer"
      >
        <div>{title.toUpperCase()}</div>
        <div>{isOpen ? <BsChevronUp /> : <BsChevronDown />}</div>
      </div>
      {isOpen && category && category.length > 0 && (
        <form
          className="absolute z-20 h-fit w-full bg-white border px-4 py-3 flex flex-col gap-2"
          onSubmit={handleApply}
        >
          {category.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => handleClick(item.title)}
                  className={`w-4 h-4 border border-black  ${
                    tempParams.includes(item.title) && "bg-black"
                  } `}
                />
                <p
                  onClick={() => {
                    handleClick(item.title);
                  }}
                  className="uppercase inline-flex gap-2 items-center justify-between"
                >
                  {item.title}{" "}
                  {openSubmenu[item.title] ? <BiMinus /> : <BiPlus />}
                </p>
              </div>
              {openSubmenu[item.title] && (
                <div className="pl-6 flex flex-col gap-2">
                  {item.subcategories.data.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex gap-1 items-center"
                      onClick={(event) =>
                        handleSubitemClick(
                          event,
                          item.title,
                          subcategory.attributes.name
                        )
                      }
                    >
                      <div
                        className={`w-4 h-4 border border-black  ${
                          selectedSubitems[item.title] &&
                          selectedSubitems[item.title].includes(
                            subcategory.attributes.name
                          )
                            ? "bg-black"
                            : ""
                        } `}
                      />
                      <p>{subcategory.attributes.name} </p>
                    </div>
                  ))}
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
