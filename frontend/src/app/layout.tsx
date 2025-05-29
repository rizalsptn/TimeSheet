import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { AuthProvider }  from "@/context/AuthContext";
import { PopupProvider} from "@/context/PopupContext";
import PopupManager from "@/components/Layouts/PopupManager";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "TimeSheet",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <PopupProvider>
            <NextTopLoader />
            <LayoutWrapper>{children}</LayoutWrapper>
            <PopupManager/>  
            </PopupProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
