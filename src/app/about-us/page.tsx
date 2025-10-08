'use client';

import { Building2, Mail, Phone, MapPin, Globe, Info, Users, Code } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="bg-card/60 backdrop-blur-lg border border-border/20 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:border-border/40">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-primary/10 p-2 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
    </div>
    <div className="text-muted-foreground space-y-2">
      {children}
    </div>
  </div>
);


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-50 to-blue-50 dark:from-background dark:via-gray-900/50 dark:to-blue-900/20 text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:px-6">
        <Logo />
        <div className="flex-1" />
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center py-8">
            <div className="inline-block p-4 rounded-2xl bg-card/60 backdrop-blur-lg border border-border/20 mb-4">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">About PG Connect</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Simplifying PG management for owners and the accommodation search for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InfoCard icon={Info} title="Our Mission">
               <p>Our purpose is to streamline the entire experience of finding and managing Paying Guest accommodations, creating a seamless connection between property owners and students.</p>
            </InfoCard>

            <InfoCard icon={Users} title="Developed By">
                <p className="font-semibold">Vineet Singh and Team</p>
                <p>A passionate group of developers dedicated to creating intuitive and powerful solutions for the student housing market.</p>
            </InfoCard>

            <div className="md:col-span-2">
              <InfoCard icon={Code} title="Contact & Support">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="mailto:pgconnect007@gmail.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Mail className="h-5 w-5 text-accent-foreground/80" />
                      <span>pgconnect007@gmail.com</span>
                    </a>
                    <a href="tel:+918318328101" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="h-5 w-5 text-accent-foreground/80" />
                      <span>+91-8318328101</span>
                    </a>
                    <div className="flex items-center gap-3 p-3">
                        <MapPin className="h-5 w-5 text-accent-foreground/80" />
                        <span>MIT-ADT University, Pune</span>
                    </div>
                     <a href="https://www.pgconnect.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Globe className="h-5 w-5 text-accent-foreground/80" />
                      <span>www.pgconnect.com</span>
                    </a>
                </div>
              </InfoCard>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>Version: 1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
