import { Inter } from "next/font/google";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@/assets/styles/globals.css';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpaceCheck App | Find and Book Available Spaces at Swarthmore",
  description: "Find and book available spaces on campus for study or hanging out",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto.max-w-7xl px-4 py-6 sm: px-6 lg: px-8">
          {children}
        </main>
        <Footer/>
        <ToastContainer />
      </body>
    </html>
    </AuthWrapper>
  );
}
