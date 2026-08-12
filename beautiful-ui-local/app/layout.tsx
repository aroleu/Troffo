import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beautiful UI — Local Study Library",
  description: "A private local study copy of AI-native interface primitives.",
};

const themeScript = `
  try {
    var theme = localStorage.getItem("bui-theme");
    document.documentElement.classList.toggle("dark", theme !== "light");
  } catch (error) {
    document.documentElement.classList.add("dark");
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="__variable_f367f3 __variable_3c557b font-sans">
        {children}
      </body>
    </html>
  );
}
