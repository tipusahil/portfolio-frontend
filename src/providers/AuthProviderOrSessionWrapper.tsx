"use client";
import { SessionProvider } from "next-auth/react";

const AuthProviderOrSessionWrapper = ({children}: {children:React.ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default AuthProviderOrSessionWrapper;