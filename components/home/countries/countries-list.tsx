"use client";
import { AppDispatch, useAppSelector } from "@/store/store";
import CountryItem from "./country-item";
import { useDispatch } from "react-redux";
import { changeCountries } from "@/store/features/countries.slice";
import { useEffect } from "react";
import Link from "next/link";

const CountriesList = () => {
  const countries = useAppSelector((state) => state.countries.countries);
  const countryFilter = useAppSelector(
    (state) => state.countries.countryFilter
  );

  const dispatch = useDispatch<AppDispatch>();

  const addCountriesHandler = (countries: any) => {
    dispatch(changeCountries(countries));
  };

  const fetchDataFromAPI = async () => {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
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

  useEffect(() => {
    if (countries.length === 0) fetchDataFromAPI();

    return () => {};
  }, []);

  return (
    <section className="my-6 sm:my-9 lg:my-12 flex flex-wrap justify-center gap-8 xl:gap-10 2xl:gap-[4.6rem]">
      {countries
        .filter((country) =>
          countryFilter
            ? country.name.common
                .toLowerCase()
                .includes(countryFilter.toLowerCase())
            : true
        )
        .map((country) => (
          <Link href={`/${country.name.common}`} key={country.name.common}>
            <CountryItem country={country} />
          </Link>
        ))}
    </section>
  );
};

export default CountriesList;
