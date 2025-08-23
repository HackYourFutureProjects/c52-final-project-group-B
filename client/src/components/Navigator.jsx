import { Navbar, NavbarBrand, NavbarContent, Link } from "@heroui/react";
import UserAuth from "@/components/UserAuth";
import { MemixLogoIcon } from "@/components/Icons";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ROUTES } from "@/routes/paths.js";

export default function Navigator() {
  return (
    <>
      <Navbar
        classNames={{
          base: "rounded-full container mt-4 top-4 md:mt-8 md:top-8 ring-1 ring-default bg-secondary/5",
        }}
        maxWidth="full"
      >
        <NavbarBrand justify="start">
          <Link className="text-foreground" href={ROUTES.HOME}>
            <MemixLogoIcon size={120} />
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <ThemeSwitcher />
          <UserAuth />
        </NavbarContent>
      </Navbar>
      <div className="h-20"></div>
    </>
  );
}
