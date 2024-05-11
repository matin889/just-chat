import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Just Chatt App",
  description: "Nextjs chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        </body>
    </html>
  );
}
