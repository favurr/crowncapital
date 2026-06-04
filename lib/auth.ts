import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { onPasswordResetEmail, sendEmail, sendPasswordResetEmail } from "@/server/send-email";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({
        to: user.email,
        subject: "Reset Your EliteWealth Password",
        meta: {
          description: `We received a request to reset your EliteWealth password.`,
          link: url,
        },
      });
    },
    onPasswordReset: async ({ user }) => {
      await onPasswordResetEmail({
        to: user.email,
        subject: "Your EliteWealth Password Has Been Reset",
        meta: {
          description: `Your EliteWealth password has been successfully reset. If you did not initiate this change, please contact our support team immediately.`,
        },
      });
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 10,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { searchParams } = new URL(url);
      const token = searchParams.get("token");

      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: "Verify Your EliteWealth Email Address",
        meta: {
          description: `Thank you for creating an EliteWealth account.

                      To complete your registration and secure your account,
                      please verify your email address by clicking the button below.`,
          link: verificationUrl,
        },
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        input: false,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  plugins: [nextCookies()],
  trustedOrigins: [String(process.env.NEXT_PUBLIC_BASE_URL)],
});

export type Errorcode = keyof typeof auth.$ERROR_CODES | "UNKNOWN_ERROR";
