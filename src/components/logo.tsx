import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="p-1 rounded-md bg-gradient-to-br from-gray-700 to-gray-900">
        <Building2 className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-700 to-gray-900 drop-shadow-sm">
        PG Connect
      </span>
    </Link>
  );
}
