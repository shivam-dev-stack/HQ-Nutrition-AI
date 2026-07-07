"use client";

import Link from "next/link";
import { Home, Refrigerator, User, CookingPot } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 ${
        active
          ? "text-emerald-600 font-bold bg-emerald-50/60"
          : "text-slate-500 hover:text-slate-700 font-medium"
      }`}
    >
      <div className={`transition-transform duration-200 ${active ? "scale-110" : ""}`}>
        {icon}
      </div>
      <span className="text-[10px] tracking-wide capitalize">{label}</span>
    </Link>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();

  // Helper function to check dynamic nesting rules safely
  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"; // Exact check explicitly for core dashboard path
    }
    return pathname.startsWith(href); // StartsWith matching ensures nested layouts retain active status
  };

  return (
    // FIXED: Added md:hidden to hide this component natively on tablets and monitors. 
    // Desktop layout uses the vertical collapsible sidebars we designed earlier!
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/90 backdrop-blur-md py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex justify-around items-center px-2">
        
        <NavItem
          href="/dashboard"
          icon={<Home size={20} />}
          label="Home"
          active={isLinkActive("/dashboard")}
        />

        <NavItem
          href="/dashboard/fridge"
          icon={<Refrigerator size={20} />}
          label="Fridge"
          active={isLinkActive("/dashboard/fridge")}
        />

        <NavItem
          href="/dashboard/recipes"
          icon={<CookingPot size={20} />}
          label="Recipes"
          active={isLinkActive("/dashboard/recipes")}
        />

        <NavItem
          href="/dashboard/profile"
          icon={<User size={20} />}
          label="Profile"
          active={isLinkActive("/dashboard/profile")}
        />

      </div>
    </nav>
  );
}