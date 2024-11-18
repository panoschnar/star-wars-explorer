import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StarWarsProvider } from "./context/StarWarsContext";
import Starfield from "./components/Starfield";


export const metadata = {
  title: "Star Wars Explorer",
  description: "Explore the Star Wars universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        <StarWarsProvider>{children}</StarWarsProvider>{" "}
      </body>
    </html>
  );
}
