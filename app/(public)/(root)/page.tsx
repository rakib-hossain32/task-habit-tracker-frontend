import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="">
      {/* <Header /> */}
      <main
        className={cn(
          "relative mx-auto max-w-7xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection />
        <LogosSection />
      </main>
    </div>
  );
}
