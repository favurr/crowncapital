"use server";

import { auth, Errorcode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { toast } from "sonner";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { success: true, message: "Sign-in successfully" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to sign in",
          };
      }
    }
  }
};
export const signUpUser = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      asResponse: true,
    });

    return { success: true, message: "Account Created" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to sign in",
          };
      }
    }
  }
};

export const signOutUser = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true, message: "Sign-out successfully" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to sign in",
          };
      }
    }
  }
};

export const getSession = async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to sign in",
          };
      }
    }
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
      },
    });

    return { success: true, message: "Password reset requested" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to request password reset",
          };
      }
    }
  }
};

export const resetPassword = async (newPassword: string) => {
  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) {
    toast.error("no token")
    return
  }

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });
    return { success: true, message: "Password reset successfully" };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as Errorcode) : "UNKNOWN_ERROR";

      switch (errCode) {
        default:
          return {
            success: false,
            message: err.message || "Failed to reset password",
          };
      }
    }
  }
};
