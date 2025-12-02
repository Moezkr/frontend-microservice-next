
'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const liensNavigation = [
  { nom: "Gestion des Employés", href: "/employes" },
  { nom: "Gestion des Tâches", href: "/taches" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">Gestion Microservices</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {liensNavigation.map((lien) => (
            <Link
              key={lien.nom}
              href={lien.href}
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60 p-2",
                pathname.startsWith(lien.href) ? "text-foreground font-semibold border-b-2 border-primary" : "text-foreground/60"
              )}
            >
              {lien.nom}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
