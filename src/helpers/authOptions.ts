import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import toast from "react-hot-toast";

// ---------------
// Type declaration for custom user fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      role: string | null;
      accessToken?: string; // ✅ অ্যাড করো
      refreshToken?: string; // ✅ অ্যাড করো
      name: string | null;
      image: string | null;
    };
  }

  interface User {
    id: string;
    email: string | null;
    role: string | null;
    accessToken?: string; // ✅ অ্যাড করো
    refreshToken?: string; // ✅ অ্যাড করো
    name: string | null;
    image: string | null;
  }
}
// ---------------

// console.log("google client secrettoken is", process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ------------------ Credentials Provider -------------------
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jhon.due@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 🔹 Step 1: Basic validation
        if (!credentials?.email || !credentials.password) {
          console.error("❌ Email or Password missing!");
          return null;
        }

        try {
          // 🔹 Step 2: API call to backend
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              // credentials: "include", // ✅ এটা অ্যাড করো: যাতে ব্যাকএন্ড থেকে কুকি (accessToken) ব্রাউজারে সেট হয়// jeheto ami browser er cookie te accessToken paccina,tai backend er response thekei accessToken nicci,tai credentials:"include" ta comment kore raklam karon next-auth accessToken na niye nijer next.session.token diye kaj calai nicce,, karon JSON response theke nibe token,,, browser er cookie theke nibena
            }
          );
          console.log("📦 Res from backend:", res);

          // console.log("📦 Login response status:", res.status, res.statusText); // ✅ ডিবাগ
          // console.log(
          //   "📦 Login response headers:",
          //   Object.fromEntries(res.headers)
          // ); // ✅ ডিবাগ
          // 🔹 Step 3: Get JSON response
          const response = await res.json();

          console.log("📦 Response from backend:", response);

          // 🔹 Step 4: Backend status check
          // ⚠️ এখানে তোমার মূল ভুল ছিল:
          // তোমার backend থেকে response আসে:
          // {
          //   "user": { "email": "tipusahil.ctg@gmail.com", "id": 1, "role": "owner" },
          //   "expires": "2025-11-17T10:40:55.220Z"
          // }
          //
          // কিন্তু তুমি check করছো: response.success && response.data — যা নেই।

          // 🔹 Step 4: Backend status check
          if (response?.success && response?.data) {
            const user = response.data;

            // 🔹 Step 5: Return user object (NextAuth expects this)
            return {
              id: user.id.toString(), // ✅ id string করো যাতে Next-Auth সেশন সাপোর্ট করে
              email: user.email,
              role: user.role,
              // accessToken রিটার্ন করার দরকার নেই, কারণ কুকি থেকে নিবো
              accessToken: response.accessToken, // ✅ JSON থেকে নাও
              refreshToken: response.refreshToken, // ✅ JSON থেকে নাও
              name: user.name,
              image: user.picture,
            };
          }

          // ❌ যদি invalid হয়
          console.error("❌ Invalid credentials or user not found:", response);
          return null;
        } catch (error) {
          console.error("💥 Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  // ------------------ Callbacks -------------------
  callbacks: {
    async jwt({ token, user }) {
      // user first login করলে এখানে add হয়
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        // accessToken jwt-এ সেট করার দরকার নেই কারণ কুকি থেকে নিবো
        token.accessToken = user.accessToken; // ✅ jwt-এ স্টোর করো
        token.refreshToken = user.refreshToken; // ✅ jwt-এ স্টোর করো
      }
      return token;
    },

    async session({ session, token }) {
      // client-side session এ ডেটা রাখা
      if (session?.user) {
        session.user.id = token?.id as string;
        session.user.role = token?.role as string;
        session.user.email = token?.email as string;
        // accessToken session-এ সেট করার দরকার নেই কারণ কুকি থেকে নিবো
        session.user.accessToken = token?.accessToken as string; // ✅ সেশনে স্টোর করো
        session.user.refreshToken = token?.refreshToken as string; // ✅ সেশনে স্টোর করো
      }

      return session;
    },
  },

  // ------------------ Misc Config -------------------
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login", // 🔑 Login form এ redirect করবে
    signOut: "/", // 🔑 Logout করলে home page এ redirect করবে
    error: "/login", // optional
  },
};
