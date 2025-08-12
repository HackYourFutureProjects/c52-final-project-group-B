import { Navbar, NavbarBrand, NavbarContent, Link } from "@heroui/react";
import UserAuth from "@/components/UserAuth";
import { MemixLogoIcon } from "@/components/Icons";

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
          <Link className="" href="/">
            <MemixLogoIcon fill="foreground" size={120} />
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
