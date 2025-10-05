import Header from '@/components/header';
import Logo from '@/components/logo';
import { MainNav } from '@/components/main-nav';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r">
          <SidebarContent>
            <SidebarHeader className="p-2">
              <Logo />
            </SidebarHeader>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 bg-background/95">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
