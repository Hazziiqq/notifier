import type { Metadata } from "next";
import EmailForm from "./components/EmailForm";


export const metadata: Metadata = {
  title: "CallEmOut",
  description: "we gotta play boys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <p>LETS CALL THEM OUT</p>
        {children}
        <EmailForm/>
      </body>
    </html>
  );
}
