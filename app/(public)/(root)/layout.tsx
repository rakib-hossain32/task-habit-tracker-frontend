import Footer from "@/components/footer";
import { Header } from "@/components/header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
