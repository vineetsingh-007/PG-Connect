'use client';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { listings, rooms as allRooms, reviews as allReviews } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, MapPin, Star, Wifi, Utensils, Wind, BedDouble } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Room } from '@/lib/types';


const amenityIcons: { [key: string]: React.ElementType } = {
  'Wi-Fi': Wifi,
  'Food': Utensils,
  'AC': Wind,
  'Laundry': CheckCircle,
  'Gym': CheckCircle,
  'Housekeeping': CheckCircle,
  'Default': BedDouble,
};


export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const listing = listings.find((l) => l.id === id);
  const rooms = allRooms.filter((r) => r.listingId === id);
  const reviews = allReviews.filter((r) => r.listingId === id);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(rooms.length > 0 ? rooms[0] : null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!listing) {
    notFound();
  }

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    setSelectedRoom(room || null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={listing.imageUrl}
          alt={listing.name}
          fill
          className="object-cover"
          data-ai-hint="apartment building"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-white shadow-text">{listing.name}</h1>
          <p className="flex items-center text-gray-200 mt-2"><MapPin className="mr-2 h-4 w-4" />{listing.address}</p>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
            <Badge className="bg-background/80 text-foreground backdrop-blur-sm text-lg py-1 px-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span>{listing.rating.toFixed(1)}</span>
            </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">About {listing.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{listing.description}</p>
            </CardContent>
          </Card>
          
          {/* Amenities Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Amenities</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {listing.amenities.map(amenity => {
                const Icon = amenityIcons[amenity] || amenityIcons['Default'];
                return (
                  <div key={amenity} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{amenity}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Reviews Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person portrait" />
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                  </div>
                </div>
              ))}
               <Button variant="outline" className="w-full mt-4">Write a Review</Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking and Availability Sidebar */}
        <div className="space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
               <p className="text-2xl font-bold text-primary">₹{listing.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-4">
               <Separator />
               <h3 className="font-semibold pt-2">Check Availability</h3>
               {rooms.length > 0 && selectedRoom ? (
                 <>
                  <Select onValueChange={handleRoomChange} defaultValue={selectedRoom.id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          Room {room.roomNumber} - {room.isAvailable ? 'Available' : 'Booked'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex justify-center rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={[...selectedRoom.unavailableDates, { before: new Date() }]}
                    />
                  </div>
                  <Button className="w-full" size="lg" disabled={!selectedRoom.isAvailable}>Book Now</Button>
                 </>
               ) : (
                <p className="text-center text-muted-foreground p-4 border rounded-md">No rooms available for this listing.</p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
