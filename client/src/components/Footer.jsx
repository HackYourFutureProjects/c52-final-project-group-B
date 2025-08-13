import { MemixLogoIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="bg-default-300 text-default-foreground container mx-auto mt-20 mb-8 flex items-center justify-between rounded-[35px] px-8 py-4 text-center">
      <MemixLogoIcon height="auto" width={100} />
      <p>Made with ❤️ by Group B, Cohort 52</p>
    </footer>
  );
}
