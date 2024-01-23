import SearchInput from "@/components/home/search-bar/search-input";
import RegionFilter from "./region-filter";

const SearchBar = () => {
  return (
    <section className="flex flex-col  md:flex-row justify-start items-start md:justify-between md:items-center  gap-10">
      <SearchInput />
      <RegionFilter />
    </section>
  );
};

export default SearchBar;
