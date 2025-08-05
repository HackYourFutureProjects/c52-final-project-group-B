import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@heroui/react";
import UserAuth from "@/components/UserAuth";

export default function Navigator() {
  return (
    <>
      <Navbar
        classNames={{
          base: "rounded-full container mx-auto mt-8 top-8 px-1 bg-default-300/70",
        }}
        maxWidth="full"
      >
        <NavbarContent className="hidden gap-4 sm:flex" justify="start">
          <NavbarItem>
            <Button
              as={Link}
              href="/"
              variant="solid"
              radius="full"
              className="font-bold"
            >
              Home
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="#"
              variant="solid"
              radius="full"
              className="font-bold"
            >
              Library
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/user"
              variant="solid"
              radius="full"
              className="font-bold"
            >
              User (temp)
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarBrand className="flex justify-center" justify="center">
          <Link
            className="bg-default cursor-pointer rounded-full px-5 py-2"
            href="/"
          >
            <Image alt="Memix Logo" src="/memix-logo.svg" width={100}></Image>
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <UserAuth />
        </NavbarContent>
      </Navbar>
      <div className="h-20"></div>
    </>
  );
}
