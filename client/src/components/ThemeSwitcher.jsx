import { useTheme } from "@heroui/use-theme";
import { Button } from "@heroui/react";
import { DarkModeIcon, LightModeIcon } from "@/components/Icons";

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
          <LightModeIcon />
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
          <DarkModeIcon />
        </Button>
      )}
    </>
  );
};
