import SignupPage from "@/components/sign-up";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — AlphaWealth",
  description:
    "Create a new AlphaWealth account to get started with your investment dashboard.",
  keywords: ["signup", "register", "AlphaWealth", "account", "authentication"],
  authors: [{ name: "AlphaWealth" }],
};

const page = () => {
  return <SignupPage />;
};

export default page;
