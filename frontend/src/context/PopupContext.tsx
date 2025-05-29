"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PopupVariant = "INFO" | "SUCCESS" | "ERROR" | "WARNING" | "CONFIRM";

type PopupState = {
  variant: PopupVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpened: boolean;
  autoClose?: boolean; // untuk success/info yang ditutup otomatis
};

type PopupContextType = {
  popup: PopupState;
  showPopup: (popup: Omit<PopupState, "isOpened">) => void;
  closePopup: () => void;
};

const defaultPopup: PopupState = {
  variant: "INFO",
  title: "",
  message: "",
  isOpened: false,
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<PopupState>(defaultPopup);

  const showPopup = (popup: Omit<PopupState, "isOpened">) => {
    setPopup({ ...popup, isOpened: true });

    if (popup.autoClose) {
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, isOpened: false }));
      }, 2500); // auto close after 2.5s
    }
  };

  const closePopup = () => setPopup((prev) => ({ ...prev, isOpened: false }));

  return (
    <PopupContext.Provider value={{ popup, showPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
};
