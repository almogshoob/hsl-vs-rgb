import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "../../assets/icons";

const Navbar = () => {
  const isDevicePreferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const userThemePreference = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(
    userThemePreference ? userThemePreference === "dark" : isDevicePreferDark
  );

  const isNewPlayer = !localStorage.getItem("user");
  if (isNewPlayer) localStorage.setItem("user", "active");

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      document.documentElement.style.colorScheme = prev ? "light" : "dark";
      localStorage.setItem("theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/hsl-vs-rgb/" || window.location.search)
      window.location.href = "/hsl-vs-rgb/";
    else window.location.reload();
  };

  // init theme
  useEffect(() => {
    if (
      userThemePreference &&
      (userThemePreference === "dark") !== isDevicePreferDark
    )
      document.documentElement.style.colorScheme = userThemePreference;

    return () => {
      if (
        userThemePreference &&
        (userThemePreference === "dark") === isDevicePreferDark
      )
        localStorage.removeItem("theme");
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/hsl-vs-rgb" onClick={handleLogoClick} tabIndex={-1}>
          <h1>HSL vs RGB</h1>
        </a>
        <button className="icon-button" onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </nav>
    </>
  );
};

export { Navbar };
