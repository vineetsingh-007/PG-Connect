'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Home,
  BookMarked,
  MessageSquare,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/listings', label: 'Listings', icon: Home },
  { href: '/bookings', label: 'Bookings', icon: BookMarked },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/refund-tool', label: 'Refund Tool', icon: Wrench },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
              tooltip={{ children: item.label, side: 'right', align: 'center' }}
              className="justify-start"
            >
              <item.icon className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
