import ForgotPasswordPage from "@/components/forgot-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Modernize",
  description: "Reset your Modernize password if you've forgotten it.",
  keywords: ["forgot password", "reset password", "Modernize", "authentication"],
  authors: [{ name: "Modernize" }],
};

const page = () => {
  return <ForgotPasswordPage />;
};

export default page;