import "./globals.css";

export const metadata = {
  title: "AI Chat - Password Protected",
  description: "Secure AI Chat with Rate Limiting",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
