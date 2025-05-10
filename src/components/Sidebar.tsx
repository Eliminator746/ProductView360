import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios
          .get("https://dummyjson.com/products")
          .then((d) => d.data.products);

        const mySet: Set<string> = new Set();
        products.map((prd: { category: string }) => {
          mySet.add(prd.category);
        });
        setCategories([...mySet]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Product"
            className="p-2 rounded-sm border-none w-full"
          />
          <div className="flex rounded-xs justify-between">
            <input
              type="number"
              placeholder="Min"
              className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            />
            <input
              type="number"
              placeholder="Max"
              className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            />
          </div>
        </div>
        {/* Categories Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map((items, index) => {
              return (
                <label className="block mb-2" key={index}>
                  <input
                    type="radio"
                    name="category"
                    value={items}
                    className="mr-2 w-[16px] h-[16px]"
                  />
                  <span>{items.toUpperCase()}</span>
                </label>
              );
            })}
          </div>
        </div>
        {/* Keywords Section */}
        <div className="flex flex-col items-start mb-5">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          {keywords.map((items) => {
            return (
              <button className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200">
                {items.toUpperCase()}
              </button>
            );
          })}
        </div>
        <button
          // onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};
export default Sidebar;
