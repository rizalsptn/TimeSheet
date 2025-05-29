"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Halaman yang tidak memerlukan Sidebar dan Header
  const noLayoutPages = ["/auth/sign-in", "/auth/sign-out"];

  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {showLayout && <Sidebar />}

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        {showLayout && <Header />}

        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
