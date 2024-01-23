import ThemeButton from "@/components/shared/theme-button";
import Container from "./container";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" dark:bg-dark-blue shadow-sm">
      <Container>
        <div className="flex justify-between items-center  h-20">
          <Link
            className="font-bold text-[16px] md:text-[26px] hover:scale-105 transition-transform"
            href={"/"}
          >
            Where in the world?
          </Link>
          <ThemeButton />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
