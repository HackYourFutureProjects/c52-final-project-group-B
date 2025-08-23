import { useTheme } from "@heroui/use-theme";
import { Button } from "@heroui/react";
import { PiSunDimFill, PiMoonFill } from "react-icons/pi";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme("light");

  return (
    <>
      {theme === "dark" ? (
        <Button
          isIconOnly
          radius="full"
          size="sm"
          aria-label="Light Mode"
          className="hover:bg-primary hover:text-default"
          onPress={() => setTheme("light")}
        >
          <PiSunDimFill size={20} />
        </Button>
      ) : (
        <Button
          isIconOnly
          radius="full"
          size="sm"
          aria-label="Dark Mode"
          className="hover:bg-primary hover:text-default"
          onPress={() => setTheme("dark")}
        >
          <PiMoonFill size={20} />
        </Button>
      )}
    </>
  );
};
