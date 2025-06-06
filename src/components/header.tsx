import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "@/context/theme-provider";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={
              theme === "dark"
                ? "/clima_skt-react-project/public/logo-dark.png"
                : "/clima_skt-react-project/public/logo-light.png"
            }
            alt="CliMaSKT"
            className="h-14"
          />
        </Link>

        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
{
  /* 
  <img
  src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
  alt="Klimate logo"
  className="h-14"
/>; */
}
