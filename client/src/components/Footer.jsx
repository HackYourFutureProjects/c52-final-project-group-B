import { Image } from "@heroui/react";

export default function Footer() {
  return (
    <footer className="bg-default-300 container mx-auto mb-8 flex items-center justify-between rounded-[35px] px-8 py-4 text-center">
      <Image alt="Memix Logo" src="/memix-logo.svg" width={100}></Image>
      <p>Made with ❤️ by Group B, Cohort 52</p>
    </footer>
  );
}
