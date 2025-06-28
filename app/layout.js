import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Trackify - Smart Financial Management",
  description: "AI-powered financial platform for intelligent expense tracking, budgeting, and financial insights",
  keywords: "finance, budgeting, expense tracking, AI, financial management",
  authors: [{ name: "Sachin Kumar N" }],
  creator: "Sachin Kumar N",
  openGraph: {
    title: "Trackify - Smart Financial Management",
    description: "Transform your financial life with AI-powered insights and smart budgeting tools",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trackify - Smart Financial Management",
    description: "AI-powered financial platform for intelligent expense tracking and budgeting",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#059669",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main className="min-h-screen bg-background">
              {children}
            </main>
            
            {/* Toast Notifications */}
            <Toaster 
              richColors 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: 'hsl(var(--foreground))',
                },
              }}
            />
            
            {/* Footer */}
            <footer className="bg-card border-t">
              <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  {/* Brand Section */}
                  <div className="max-w-xl">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">T</span>
                      </div>
                      <span className="text-2xl font-bold text-gradient">Trackify</span>
                    </div>
                    <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                      Empowering individuals to take control of their financial future through 
                      intelligent tracking, smart budgeting, and AI-powered insights.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="flex justify-center md:justify-end items-center w-full md:w-auto">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-center md:text-right">Quick Links</h3>
                      <ul className="space-y-3 text-center md:text-right">
                        <li><a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a></li>
                        <li><a href="/tool" className="text-muted-foreground hover:text-primary transition-colors">Financial Tools</a></li>
                        <li><a href="/transaction/create" className="text-muted-foreground hover:text-primary transition-colors">Add Transaction</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border mt-12 pt-8 flex justify-center items-center">
                  <p className="text-muted-foreground text-sm text-center">
                    © Trackify. Made with ❤️ by Sachin Kumar N
                  </p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}