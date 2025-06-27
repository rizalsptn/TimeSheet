"use client";

import { useSidebarContext } from "../sidebar/sidebar-context";
import { UserInfo } from "./user-info";
import { HamburgerMenuIcon } from "./user-info/icons";

export function Header() {
  const { isMobile, toggleSidebar } = useSidebarContext();

  return (
    <header className={`sticky top-0 z-10 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10 ${isMobile ? "bg-gray-200" : "bg-white"}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="block md:hidden p-2"
          aria-label="Toggle sidebar"
        >
          <HamburgerMenuIcon className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
