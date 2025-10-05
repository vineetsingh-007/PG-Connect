import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-primary", className)}>
      <Building2 className="h-7 w-7" />
      <span className="text-xl font-bold font-headline tracking-wide">PG Connect</span>
    </Link>
  );
}
