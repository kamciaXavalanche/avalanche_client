import React from "react";
import Products from "./Products";

const CategoryPage = ({ params }) => {
  console.log(params);

  return (
    <div className="p-4">
      <h2 className="text-center uppercase font-semibold">{params.category}</h2>
      <div>
        <Products slug={params.category} />
      </div>
    </div>
  );
};

export default CategoryPage;
