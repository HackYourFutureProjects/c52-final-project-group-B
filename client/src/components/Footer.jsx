// src/components/Footer.jsx
import { Link, Divider, Tooltip } from "@heroui/react";
import { ROUTES } from "@/routes/paths.js";
import { MemixLogoIcon } from "@/components/Icons";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-10 flex w-full justify-center">
      <div className="bg-default-100 ring-default absolute flex w-full flex-col items-center justify-center px-4 py-8 ring-1 md:p-8">
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <Link href={ROUTES.FAQ} underline="hover" color="foreground">
            FAQ
          </Link>
          <Divider orientation="vertical" className="hidden h-5 md:block" />
          <Link href={ROUTES.ABOUT} underline="hover" color="foreground">
            About
          </Link>
          <Divider orientation="vertical" className="hidden h-5 md:block" />
          <Link href="/support" underline="hover" color="foreground">
            Support
          </Link>
          <Divider orientation="vertical" className="hidden h-5 md:block" />
          <Link href={ROUTES.TERMS} underline="hover" color="foreground">
            Terms of Use
          </Link>
          <Divider orientation="vertical" className="hidden h-5 md:block" />
          <div className="flex w-full items-center justify-center gap-4 md:w-auto">
            <Tooltip content="Facebook">
              <Link
                isExternal
                href="https://www.facebook.com/"
                aria-label="Facebook"
                className="bg-default text-foreground rounded-full p-2"
              >
                <FaSquareFacebook size={24} />
              </Link>
            </Tooltip>

            <Tooltip content="Twitter / X">
              <Link
                isExternal
                href="https://twitter.com/"
                aria-label="Twitter"
                className="bg-default text-foreground rounded-full p-2"
              >
                <FaSquareXTwitter size={24} />
              </Link>
            </Tooltip>

            <Tooltip content="Instagram">
              <Link
                isExternal
                href="https://www.instagram.com/"
                aria-label="Instagram"
                className="bg-default text-foreground rounded-full p-2"
              >
                <FaSquareInstagram size={24} />
              </Link>
            </Tooltip>
          </div>
        </nav>
        <Divider className="container my-4" />
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href={ROUTES.HOME} className="text-foreground">
            <MemixLogoIcon width={120} height={40} />
          </Link>
          <p className="text-foreground text-center md:text-right">
            Made with ❤️ by Group B, Cohort 52 — 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
