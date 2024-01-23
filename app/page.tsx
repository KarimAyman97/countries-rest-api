import CountriesList from "@/components/home/countries/countries-list";
import SearchBar from "@/components/home/search-bar/search-bar";
import Container from "@/components/shared/container";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="flex flex-col gap-10">
          <SearchBar />
          <CountriesList />
        </div>
      </Container>
    </main>
  );
}
