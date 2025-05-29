"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState("Rizal");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {}, {
        withCredentials: true,
      });
      router.push("/"); // Redirect ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const USER = {
    name: username,
    email: "johnson@nextadmin.com",
    img: "/images/user/user-03.png",
  };
  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-4">Apakah kamu yakin ingin logout?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
          <span className="sr-only">My Account</span>

          <figure className="flex items-center gap-3">
            <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
              <span>{USER.name}</span>

              <ChevronUpIcon
                aria-hidden
                className={cn(
                  "rotate-180 transition-transform",
                  isOpen && "rotate-0",
                )}
                strokeWidth={1.5}
              />
            </figcaption>
          </figure>
        </DropdownTrigger>

        <DropdownContent
          className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
          align="end"
        >
          <h2 className="sr-only">User information</h2>

          <figure className="flex items-center gap-2.5 px-5 py-3.5">
            <Image
              src={USER.img}
              className="size-12"
              alt={`Avatar for ${USER.name}`}
              role="presentation"
              width={200}
              height={200}
            />

            <figcaption className="space-y-1 text-base font-medium">
              <div className="mb-2 leading-none text-dark dark:text-white">
                {USER.name}
              </div>

              <div className="leading-none text-gray-6">{USER.email}</div>
            </figcaption>
          </figure>

          <hr className="border-[#E8E8E8] dark:border-dark-3" />

          <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
            <Link
              href={"/profile"}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            >
              <UserIcon />

              <span className="mr-auto text-base font-medium">View profile</span>
            </Link>

            <Link
              href={"/pages/settings"}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            >
              <SettingsIcon />

              <span className="mr-auto text-base font-medium">
                Account Settings
              </span>
            </Link>
          </div>

          <hr className="border-[#E8E8E8] dark:border-dark-3" />

          <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
            <button
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
              onClick={() => {
                setIsOpen(false);
                setIsPopupOpen(true);
              }}
            >
              <LogOutIcon />

              <span className="text-base font-medium">Log out</span>
            </button>
          </div>
        </DropdownContent>
      </Dropdown>
    </>
  );
}
