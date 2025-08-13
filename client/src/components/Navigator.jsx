import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@heroui/react";
import UserAuth from "@/components/UserAuth";
import { MemixLogoIcon } from "@/components/Icons";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Navigator() {
  return (
    <>
      <Navbar
        classNames={{
          base: "rounded-full container mx-auto mt-8 top-8 bg-default-300/40",
        }}
        maxWidth="full"
      >
        <NavbarBrand justify="start">
          <Link className="text-default-foreground" href="/">
            <MemixLogoIcon size={120} />
          </Link>
        </NavbarBrand>

        <NavbarContent justify="center">
          <NavbarItem>
            <Button
              as={Link}
              href="/about"
              variant="solid"
              radius="full"
              className="font-bold"
            >
              About
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <ThemeSwitcher />
          <UserAuth />
        </NavbarContent>
      </Navbar>
      <div className="h-20"></div>
    </>
  );
}
