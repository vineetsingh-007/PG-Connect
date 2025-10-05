import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { listings } from '@/lib/data';
import { PlusCircle, Star } from 'lucide-react';

export default function ListingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Listings</h1>
          <p className="text-muted-foreground">Manage your PG accommodations.</p>
        </div>
        <Button asChild>
          <Link href="/listings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Listing
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={listing.imageUrl}
                alt={listing.name}
                fill
                className="object-cover"
                data-ai-hint="apartment exterior"
              />
               <Badge className="absolute top-2 right-2 flex items-center gap-1">
                <Star className="h-3 w-3" />
                {listing.rating.toFixed(1)}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg truncate">{listing.name}</CardTitle>
              <CardDescription className="truncate">{listing.address}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary">{amenity}</Badge>
                ))}
                {listing.amenities.length > 3 && (
                  <Badge variant="outline">+{listing.amenities.length - 3} more</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
              <div className="text-lg font-semibold text-primary">
                ₹{listing.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/listings/${listing.id}`}>Manage</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
