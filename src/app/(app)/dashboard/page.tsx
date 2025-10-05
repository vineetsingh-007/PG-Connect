import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, BookMarked, MessageSquare, DollarSign, Activity, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookings, listings } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change?: string, changeType?: 'increase' | 'decrease' }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow bg-card/80 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className="text-xs text-muted-foreground">
          <span className={changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
            {changeType === 'increase' ? '+' : '-'}{change}
          </span>
          {' '}from last month
        </p>
      )}
    </CardContent>
  </Card>
);


export default function DashboardPage() {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your PG activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Listings" value={listings.length.toString()} icon={Home} change="2" changeType="increase" />
        <StatCard title="Active Bookings" value={bookings.filter(b => b.status === 'Confirmed').length.toString()} icon={BookMarked} change="5.2%" changeType="increase" />
        <StatCard title="Monthly Revenue" value={`₹${(15000 * 2 + 12000).toLocaleString()}`} icon={DollarSign} change="12.1%" changeType="increase" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => {
                  const listing = listings.find(l => l.id === booking.listingId);
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.studentName}</TableCell>
                      <TableCell>{listing?.name || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Pending' ? 'secondary' : 'destructive'}
                          className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <Link href="/bookings">View All Bookings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button asChild size="lg" className="h-20 flex-col gap-1">
              <Link href="/listings/new">
                <Home className="h-5 w-5" />
                <span>Add New Listing</span>
              </Link>
            </Button>
            <Button asChild size="lg" className="h-20 flex-col gap-1" variant="secondary">
               <Link href="/messages">
                <MessageSquare className="h-5 w-5" />
                <span>Check Messages</span>
              </Link>
            </Button>
            <Button asChild size="lg" className="h-20 flex-col gap-1" variant="secondary">
              <Link href="/bookings">
                <Users className="h-5 w-5" />
                <span>Manage Tenants</span>
              </Link>
            </Button>
            <Button asChild size="lg" className="h-20 flex-col gap-1" variant="secondary">
              <Link href="/refund-tool">
                <Activity className="h-5 w-5" />
                <span>View Reports</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
