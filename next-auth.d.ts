// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      googleId: string;
      subscription: {
        status: 'trial' | 'active' | 'expired';
        trialStart: Date;
        trialEnd: Date;
        plan?: string;
      };
      accessToken: string;
    };
    error?: string;
  }
}
