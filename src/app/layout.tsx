import "./globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  background: "hsl(150, 100%, 35%)",
                  color: "#fff",
                  fontWeight: 500,
                  borderRadius: "10px",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "hsl(150, 100%, 35%)",
                },
              },
              error: {
                style: {
                  background: "hsl(0, 100%, 50%)",
                  color: "#fff",
                  borderRadius: "10px",
                  fontWeight: 500,
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>

  );
}
