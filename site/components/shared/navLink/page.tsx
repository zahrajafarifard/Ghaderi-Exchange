"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} passHref>
      <h3
        className={`text-xl font-bold leading-4 w-36 my-auto text-center screen980:w-28 screen750:w-24 screen660:w-28 screen400:w-24 ${
          isActive
            ? "bg-[#33B446] text-white rounded-full p-4 screen1200:p-3 screen980:p-2 hover:bg-[#258333] active:bg-[#258333]"
            : "text-[#2D2D2D]"
        } cursor-pointer screen1200:text-lg screen980:text-base screen400:text-sm `}
      >
        {children}
      </h3>
    </Link>
  );
};

export default NavLink;
