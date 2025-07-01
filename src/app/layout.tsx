import "./globals.css";

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
      </body>
    </html>
  );
}
