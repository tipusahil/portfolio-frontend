import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble_new_for_IOS_friendly_version";
import { ThemeProvider } from "@/components/shared/navbar/theme-provider";
import AuthProviderOrSessionWrapper from "@/providers/AuthProviderOrSessionWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { FacebookPixelProvider } from "../../FacebookPixelProvider-folder-2/components/FacebookPixelProvider";

// import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// })

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
      >
        {/* <BubbleBackground
          interactive
          className="fixed inset-0 -z-50 pointer-events-none"
        /> */}
        <BubbleBackground
          interactive
          className="fixed inset-0 -z-50 pointer-events-none contain-paint" // ✅ contain: paint অ্যাড করো
          style={{ transform: "translateZ(0)" }} // ✅ iOS-এ ফোর্স রেন্ডার
        />
        {/* <StarryBackground> */}
        {/* <Provider store={store}> */}
        <Toaster
          position="top-center" // toast কোথায় দেখাবে (top-right, bottom-left ইত্যাদি)
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "15px",
            },
          }}
        />


{/* --------facebook meta--------- */}
     {/* Facebook Pixel Provider */}
        <FacebookPixelProvider />
{/* --------facebook meta--------- */}

        <AuthProviderOrSessionWrapper>
          <ThemeProvider
            // attribute="class"
            // defaultTheme="system"
            // // enableSystem
            // enableSystem={true}
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProviderOrSessionWrapper>
        {/* </Provider> */}
        {/* </StarryBackground> */}
      </body>
    </html>
  );
}
