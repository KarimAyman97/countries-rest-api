"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const ToggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    mounted && (
      <>
        {theme === "dark" && (
          <button onClick={ToggleTheme} className="flex">
            <HiSun className="my-1 mx-2" />
            Light Mode
          </button>
        )}
        {theme === "light" && (
          <button onClick={ToggleTheme} className="flex">
            <HiMoon className="my-1 mx-2" />
            Dark Mode
          </button>
        )}
      </>
    )
  );
};

export default ThemeButton;
