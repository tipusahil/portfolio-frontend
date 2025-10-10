

import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/navbar/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import StarryBackground from "@/components/modules/background/StarryBackground";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Tipusahil - Full-Stack Developer",
  description: "full-stack web application developer tipusahil's portfolio",
  icons: {
    icon: "/myfavicon.png",
    shortcut: "/myfavicon.png",
    apple: "/myfavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
      >
        {/* <StarryBackground> */}
        {/* <Provider store={store}> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        {/* </Provider> */}
        {/* </StarryBackground> */}
      </body>
    </html>
  );
}
