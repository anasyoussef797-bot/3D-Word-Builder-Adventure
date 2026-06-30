import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Word Builder Adventure - Impact Hub Egypt",
  description: "An educational game for children 3-6 years old by Impact Hub Egypt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
