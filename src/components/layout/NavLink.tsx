import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export default function NavLink({ href, children, icon: Icon, className, iconClassName, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
        className
      )}
    >
      {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
      <span>{children}</span>
    </Link>
  );
}
