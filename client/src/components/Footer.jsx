// src/components/Footer.jsx
import { Link, Divider, Tooltip } from "@heroui/react";
import { MemixLogoIcon } from "@/components/Icons";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-default-200 mt-12 p-6 md:p-8">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 text-center md:gap-10">
        <Link
          href="/faq"
          underline="hover"
          color="foreground"
          className="text-foreground font-semibold hover:opacity-80"
        >
          FAQ
        </Link>
        <Divider orientation="vertical" className="hidden h-5 md:block" />
        <Link
          href="/about"
          underline="hover"
          color="foreground"
          className="text-foreground font-semibold hover:opacity-80"
        >
          About
        </Link>
        <Divider orientation="vertical" className="hidden h-5 md:block" />
        <Link
          href="/support"
          underline="hover"
          color="foreground"
          className="text-foreground font-semibold hover:opacity-80"
        >
          Support
        </Link>
        <Divider orientation="vertical" className="hidden h-5 md:block" />
        <Link
          href="/terms"
          underline="hover"
          color="foreground"
          className="text-foreground font-semibold hover:opacity-80"
        >
          Terms of Use
        </Link>
        <Divider orientation="vertical" className="hidden h-5 md:block" />
        <div className="flex items-center gap-3">
          <span className="text-foreground font-semibold">Social Media</span>

          <Tooltip content="Facebook">
            <Link
              isExternal
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              underline="none"
              className="bg-default-300 rounded-full p-2 transition hover:opacity-80"
            >
              <FaFacebook className="text-foreground h-5 w-5" />
            </Link>
          </Tooltip>

          <Tooltip content="Twitter / X">
            <Link
              isExternal
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              underline="none"
              className="bg-default-300 rounded-full p-2 transition hover:opacity-80"
            >
              <FaTwitter className="text-foreground h-5 w-5" />
            </Link>
          </Tooltip>

          <Tooltip content="Instagram">
            <Link
              isExternal
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              underline="none"
              className="bg-default-300 rounded-full p-2 transition hover:opacity-80"
            >
              <FaInstagram className="text-foreground h-5 w-5" />
            </Link>
          </Tooltip>
        </div>
      </nav>
      <Divider className="mx-auto my-6 max-w-6xl" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="text-default-foreground">
          <MemixLogoIcon width={160} height={49} />
        </Link>
        <p className="text-foreground text-right text-base font-semibold md:text-lg">
          Made with ❤️ by Group B, Cohort 52 — 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
