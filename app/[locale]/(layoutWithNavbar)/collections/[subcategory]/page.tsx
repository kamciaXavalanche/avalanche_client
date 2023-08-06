import React from "react";
import Products from "./Products";

const SubcategoryPage = ({ params }) => {
  console.log(params);

  return (
    <div className="p-4">
      <h2 className="text-center uppercase font-semibold">
        {params.subcategory}
      </h2>
      <div>
        <Products slug={params.subcategory} />
      </div>
    </div>
  );
};

export default SubcategoryPage;
