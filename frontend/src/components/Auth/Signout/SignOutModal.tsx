"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignOutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      {/* Tombol pembuka modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-red-500 text-white rounded"
      >
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-4">Apakah kamu yakin ingin logout?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default SignOutModal;
