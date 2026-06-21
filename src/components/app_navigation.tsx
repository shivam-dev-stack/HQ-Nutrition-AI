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

function NavItem({
  href,
  icon,
  label,
  active,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active
          ? "text-emerald-600 font-semibold"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-slate-200
        bg-white/95
        backdrop-blur
        py-3
        
      "
    >
      <div className="flex justify-around">
        <NavItem
          href="/dashboard"
          icon={<Home size={22} />}
          label="Home"
          active={pathname === "/dashboard"}
        />

        <NavItem
          href="/dashboard/fridge"
          icon={<Refrigerator size={22} />}
          label="Fridge"
          active={pathname === "/dashboard/fridge"}
        />

        <NavItem
          href="/dashboard/recipes"
          icon={<CookingPot size={22} />}
          label="recipes"
          active={pathname === "/dashboard/recipes"}
        />

        <NavItem
          href="/dashboard/profile"
          icon={<User size={22} />}
          label="Profile"
          active={pathname === "/dashboard/profile"}
        />
      </div>
    </nav>
  );
}