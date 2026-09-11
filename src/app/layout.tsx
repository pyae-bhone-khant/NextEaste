import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Register from "@/components/modals/Register";
import LoginModel from "@/components/modals/LoginModal";
import CreatePropertityModal from "@/components/modals/CreatePropertityModal";
import FilterModal from "@/components/modals/FilterModal";
import ThemeProvider from "@/components/layouts/ThemeProvider";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextEstate – Find Your Dream Property",
  description: "Browse, list, and manage real estate properties with NextEstate.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider>
          {children}
          <Register />
          <LoginModel />
          <CreatePropertityModal />
          <FilterModal />
          <EditProfileModal />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
