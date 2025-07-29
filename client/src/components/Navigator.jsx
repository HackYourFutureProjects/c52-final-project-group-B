import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Avatar,
} from "@heroui/react";

export default function Navigator() {
  return (
    <Navbar
      classNames={{
        base: "rounded-full max-w-[1280px] mx-auto mt-8 top-8 px-1 bg-default-200",
      }}
      maxWidth="xl"
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Button
            as={Link}
            href="/"
            color="default"
            variant="flat"
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
            color="default"
            variant="flat"
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
            color="default"
            variant="flat"
            radius="full"
            className="font-bold"
          >
            User (temp)
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarBrand className="flex justify-center" justify="center">
        <div className="bg-default-300 rounded-full px-5 py-2">
          <Image alt="Memix Logo" src="/memix-logo.svg" width={100}></Image>
        </div>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Avatar as="button" color="primary" name="U" size="sm" />
      </NavbarContent>
    </Navbar>
  );
}
