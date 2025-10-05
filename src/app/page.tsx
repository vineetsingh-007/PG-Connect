'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { colleges, listings, College } from '@/lib/data';
import MapView from '@/components/map-view';
import type { Listing } from '@/lib/types';
import Logo from '@/components/logo';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India center

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const college = colleges.find(c => c.name.toLowerCase() === searchTerm.toLowerCase());
    if (college) {
      setSelectedCollege(college);
      // In a real app, you would fetch listings near the college
      // For now, we just filter the mock data based on a mock property
      const results = listings.filter(l => l.nearbyCollegeIds?.includes(college.id));
      setFilteredListings(results);
      setMapCenter({ lat: college.lat, lng: college.lng });
    } else {
      setSelectedCollege(null);
      setFilteredListings(listings); // Show all if no college found
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-transparent">
        <Logo />
        <Button asChild>
          <Link href="/dashboard">Owner Dashboard</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://picsum.photos/seed/hero/1800/1200"
            alt="Students studying together"
            data-ai-hint="students studying"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
              Find Your Home Away From Home
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
              Search for student accommodations near your college with ease.
            </p>
            <form
              onSubmit={handleSearch}
              className="mt-8 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-lg"
            >
              <div className="w-full sm:w-auto flex-grow flex items-center relative">
                <MapPin className="absolute left-3 h-5 w-5 text-gray-300" />
                <Input
                  type="text"
                  placeholder="Enter a college name..."
                  className="w-full bg-white/20 border-0 text-white placeholder:text-gray-300 pl-10 h-12 text-base focus-visible:ring-primary focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  list="colleges-datalist"
                />
                <datalist id="colleges-datalist">
                  {colleges.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 md:p-8">
          <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2">
            <h2 className="text-2xl font-bold font-headline mb-4">
              {selectedCollege ? `Accommodations near ${selectedCollege.name}` : "All Accommodations"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredListings.map(listing => (
                <Card key={listing.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={listing.imageUrl}
                      alt={listing.name}
                      data-ai-hint="apartment building"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground">{listing.address}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {listing.amenities.slice(0, 3).map(amenity => (
                        <Badge key={amenity} variant="secondary">{amenity}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-lg font-semibold text-primary">₹{listing.price.toLocaleString()}/mo</p>
                      <Button asChild variant="outline">
                        <Link href={`/listings/${listing.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredListings.length === 0 && (
                <p className="md:col-span-2 text-center text-muted-foreground">No accommodations found for this college.</p>
              )}
            </div>
          </div>
          <div className="relative h-96 lg:h-auto rounded-lg overflow-hidden border shadow-lg">
            <MapView center={mapCenter} listings={filteredListings} />
          </div>
        </div>
      </main>
      <footer className="p-4 text-center border-t text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} PG Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}
