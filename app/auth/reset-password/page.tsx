import ResetPasswordPage from "@/components/reset-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — Modernize",
  description: "Reset your Modernize password if you've forgotten it.",
  keywords: ["reset password", "Modernize", "authentication"],
  authors: [{ name: "Modernize" }],
};

const page = () => {
  return <ResetPasswordPage />;
};

export default page;