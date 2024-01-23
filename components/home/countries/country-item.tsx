import { formatNumberWithCommas } from "@/helpers/numbers-with-commas";

const CountryItem = ({ country }: { country: any }) => {
  return (
    <div
      className="w-[16.5rem] h-[21rem] bg-very-light-dark-gray dark:bg-dark-blue rounded-[0.3125rem]  
    shadow-lg shadow-box-shadow hover:scale-105 transition-transform cursor-pointer"
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width={100}
        height={100}
        className="h-1/2 w-full rounded-t-[0.3125rem] shadow-md shadow-box-shadow"
      />
      <div className="flex flex-col gap-1 m-6">
        <h2 className="text-lg font-extrabold pb-2 truncate">
          {country.name.common}
        </h2>
        <p className="text-sm">
          <span className="font-bold">Population:</span>{" "}
          {formatNumberWithCommas(country.population)}
        </p>
        <p className="text-sm">
          <span className="font-bold">Region:</span> {country.region}
        </p>
        {country && country.capital && country.capital[0] && (
          <p className="text-sm">
            <span className="font-bold">Capital:</span> {country.capital[0]}
          </p>
        )}
      </div>
    </div>
  );
};

export default CountryItem;
