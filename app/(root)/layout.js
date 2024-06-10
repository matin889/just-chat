import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import Navbar from "@components/Navbar";
import TopBar from "@components/TopBar";
import BottomBar from "@components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Just Chatt App",
  description: "Nextjs chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-grey-3`}>
        <Provider>
          <TopBar />
          {children}
          <BottomBar />
        </Provider>
      </body>
    </html>
  );
}
