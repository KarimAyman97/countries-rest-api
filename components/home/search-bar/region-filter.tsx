"use client";
import { Menu, Transition } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { changeCountries } from "@/store/features/countries.slice";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function RegionFilter() {
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

  // const selectedCategory = useAppSelector(
  //   (state) => state.TrendingProductsSlice.category
  // );
  const dispatch = useDispatch<AppDispatch>();
  const addCountriesHandler = (countries: any) => {
    dispatch(changeCountries(countries));
  };

  const fetchDataFromAPI = async (region: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const countries = await res.json();
    const sortedCountries = countries.sort((a: any, b: any) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    addCountriesHandler(sortedCountries);
  };

  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
    fetchDataFromAPI(region);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full appearance-none justify-center gap-x-1.5 bg-white dark:bg-dark-blue px-5 py-4 text-sm rounded-md">
          {selectedRegion}
          <RiArrowDropDownLine
            className="-mr-1 h-5 w-5 ml-10 text-gray-400 dark:text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {["Africa", "America", "Asia", "Europe", "Oceania"].map(
              (region) => (
                <Menu.Item key={region}>
                  {({ active }) => (
                    <button
                      onClick={() => handleRegionSelection(region)}
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 dark:bg-dark-bg dark:text-white"
                          : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm  dark:text-white"
                      )}
                    >
                      {region}
                    </button>
                  )}
                </Menu.Item>
              )
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
