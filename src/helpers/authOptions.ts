import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
 

// ---------------
declare module "next-auth" {
  interface Session {
    user : {
      id: string,
      email : string | null,
      role : string | null,
    //   name: string | null,
    //   image : string | null,
    };
  }

  interface User {
        id: string,
      email : string | null,
      role : string | null,
    //   name: string | null,
    //   image : string | null,
  }
}
// ---------------

console.log("token is", process.env.GOOGLE_CLIENT_SECRET);

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jhon.due@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      // async authorize(credentials, req) {
  
if(!credentials?.email || !credentials.password) {
  console.error("Email Or Password is missing!");
  return null;
}

try {

      const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
      }
    );

    // console.log("response from backend: ", res);

    
    const response = await res.json();
    // console.log("response from authOptions :",response)// debugging and response kmn astece dekar jonno drkr ei log ta

      // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

      
    if (!res.ok) {
      // console.error("User Login failed!", response);
      if(response?.message ==='user not found!') {
      console.log("go & register fast");
      // return router.push("/register")
      return null;
    
      }
      return null;
    }

        if (!res.ok) {
            // 👇 এখানে check করো
            if (response?.message === "user not found!") {
              throw new Error("user-not-found");
            }
            throw new Error("login-failed");
          }


    const {data : user} = response;
    // console.log("authOption theke user :",user);// ei log taw kovi drkr 
    if (res.ok   &&   user?.id) {
      // return user;
      return { id : user?.id, name : user?.name, email : user?.email, role : user?.role, image : user?.picture };
    } else {
      return null;
    };


} catch (error: unknown ) {
  console.log(error);
    // const errorMessage = typeof error === "object" && error !== null && "message" in error
    //   ? (error as { message?: string }).message
    //   : undefined;
  return null;
}
      },
    }),
  ],

  callbacks : {
async jwt({ token , user }) {
if(user){
  token.id = user?.id;
  token.role = user?.role;
};
return token;
},

// --------
async session({session, token }){
  if(session?.user){
    session.user.id = token?.id as string;
    session.user.role = token?.role as string;
  };

  return session;
}
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login", // 🔑 Login form এ redirect করবে // protected route e jete caile login page e niye jabe, jodi token na take
    signOut: "/", // 🔑 Logout করলে home page এ redirect করবে// protected route e jete caile
    error: "/login", // (optional) error হলে কোথায় redirect করবে
    /* 
      pages.signIn: user যখন protected route এ যাবে আর login না করা থাকে, তখন তোমার custom /login পেজে নিয়ে যাবে।

pages.signOut: logout এর পর কোথায় redirect হবে সেটা fix করতে পারো।

চাইলে pages.error দিয়ে custom error page-ও দেখাতে পারো।
 */
  },
};
