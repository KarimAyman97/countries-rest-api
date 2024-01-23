/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Container from "@/components/shared/container";
import BackButton from "@/components/back-button";

async function getCountryData(countryName: string) {
  const data: any = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const countries = await data.json();
  return countries[0];
}

type countryProps = {
  params: {
    countryName: string;
  };
};

export default async function Country({ params }: countryProps) {
  const country: any = await getCountryData(params.countryName);

  function getNativeName(country: any): string {
    if (country.name?.nativeName) {
      const nativeNameKey = Object.keys(country.name.nativeName)[0];
      return country.name.nativeName[nativeNameKey].common;
    }
    return "-";
  }

  function getCurrencies(country: any): string {
    if (country.currencies) {
      const currencies: string[] = [];

      Object.keys(country.currencies).forEach((key) => {
        currencies.unshift(country.currencies[key].name);
      });
      return currencies.join(", ");
    }
    return "-";
  }

  async function getBorderingCountries(country: any): Promise<string[]> {
    if (country?.borders !== undefined && country.borders[0] !== "-") {
      const borderingCountriesCodes = country.borders;
      const fullNamesBorderingCountries: string[] = [];

      for (let borderingCountryCode of borderingCountriesCodes) {
        const res: any = await fetch(
          `https://restcountries.com/v3.1/alpha/${borderingCountryCode}`
        );
        const borderingCountries = await res.json();
        const borderingCountryName = borderingCountries[0].name?.common;
        fullNamesBorderingCountries.unshift(borderingCountryName);
      }

      return fullNamesBorderingCountries;
    }
    return ["-"];
  }

  function getLanguages(country: any): string {
    if (country.languages !== undefined) {
      const languages: string[] = [];

      Object.keys(country.languages).forEach((key) => {
        languages.unshift(country.languages![key]);
      });
      return languages.join(", ");
    }
    return "-";
  }

  return (
    <Container>
      <BackButton />
      <div className="w-full flex flex-col md:flex-row md:justify-between my-6 sm:my-9 lg:my-12">
        <img
          src={country.flags.svg}
          alt={
            country.flags?.alt
              ? country.flags.alt
              : `The flag of ${country.name}`
          }
          className="w-full md:w-[50%] h-full md:h-[50%] rounded-[0.3125rem] shadow-md shadow-box-shadow"
        />
        <div className="w-full md:w-[45%] my-6 sm:my-9 md:my-0 flex flex-col gap-5">
          <h2 className="text-[1.375rem] md:text-2xl lg:text-[2rem] font-extrabold">
            {country.name.official} ({country.name.common})
          </h2>
          <div
            className="flex flex-col 2xl:flex-row justify-between gap-4 sm:gap-6 
          md:gap-8 my-0 sm:my-2 md:my-4 text-sm md:text-base"
          >
            <div className="flex flex-col gap-[0.15rem] md:gap-[0.35rem]">
              <p>
                <span className="font-bold">Native name:</span>{" "}
                {getNativeName(country)}
              </p>
              <p>
                <span className="font-bold">Population:</span>{" "}
                {country.population.toLocaleString("en-US")}
              </p>
              <p>
                <span className="font-bold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-bold">Sub Region:</span>{" "}
                {country.subregion ? country.subregion : " -"}
              </p>
              <p>
                <span className="font-bold">Capital:</span>{" "}
                {country.capital ? country.capital : " -"}
              </p>
            </div>
            <div className="flex flex-col gap-[0.15rem] md:gap-[0.35rem]">
              <p>
                <span className="font-bold">Top Level Domain:</span>{" "}
                {country.tld ? country.tld?.join(", ") : " -"}
              </p>
              <p>
                <span className="font-bold">Currencies:</span>{" "}
                {getCurrencies(country)}
              </p>
              <p>
                <span className="font-bold">Languages:</span>{" "}
                {getLanguages(country)}
              </p>
            </div>
          </div>
          <div className="flex flex-col 2xl:flex-row gap-2 mt-2 text-sm md:text-base">
            <p className="font-bold flex-shrink-0">Border Countries:</p>{" "}
            <div className="flex flex-wrap gap-4">
              {(await getBorderingCountries(country)).map((name) => {
                return name === "-" ? (
                  <span>&nbsp;-</span>
                ) : (
                  <Link key={name} href={`/${name}`} aria-label={`${name}`}>
                    <button
                      className="w-[8rem] md:w-[8.45rem] h-9 md:h-10 px-[1.6rem] 
                    py-[0.3rem] flex justify-center items-center bg-very-light-dark-gray
                    dark:bg-dark-blue rounded-[0.3125rem] shadow-md shadow-box-shadow 
                    hover:scale-105 transition-transform"
                    >
                      <p className="truncate">{name}</p>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
