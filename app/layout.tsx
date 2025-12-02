
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from "@/components/Navbar"; 
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        
      
        <div className="w-full p-4 sm:px-6 lg:px-8 min-h-[calc(100vh-56px)]">
            {children}
        </div>

        <SonnerToaster /> 
      </body>
    </html>
  );
}
