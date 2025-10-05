'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Listing } from '@/lib/types';
import { Building2 } from 'lucide-react';

type MapViewProps = {
  center: { lat: number; lng: number };
  listings: Listing[];
};

export default function MapView({ center, listings }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <p className="text-center text-muted-foreground p-4">
          Google Maps API Key is not configured.
          <br />
          Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId="pg-connect-map"
        style={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {listings.map((listing) => (
          <AdvancedMarker
            key={listing.id}
            position={{ lat: listing.lat, lng: listing.lng }}
            title={listing.name}
          >
             <div className="p-2 bg-primary rounded-full shadow-lg">
                <Building2 className="h-5 w-5 text-primary-foreground" />
             </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
