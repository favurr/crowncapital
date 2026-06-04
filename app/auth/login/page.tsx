import LoginPage from "@/components/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Modernize",
  description:
    "Sign in to your Modernize account to access your dashboard and manage projects.",
  keywords: ["login", "signin", "Modernize", "dashboard", "authentication"],
  authors: [{ name: "Modernize" }],
};

const page = () => {
  return <LoginPage />;
};

export default page;
