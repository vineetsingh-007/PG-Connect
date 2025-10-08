'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Listing } from '@/lib/types';
import L from 'leaflet';
import { Building2 } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Fix for default icon not showing in Leaflet
const customIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <div className="p-2 bg-primary rounded-full shadow-lg">
      <Building2 className="h-5 w-5 text-primary-foreground" />
    </div>
  ),
  className: '', // important to clear default styling
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});


type MapViewProps = {
  center: { lat: number; lng: number };
  listings: Listing[];
};

export default function MapView({ center, listings }: MapViewProps) {
  // Check if running on the client side before rendering the map
  if (typeof window === 'undefined') {
    return (
        <div className="flex items-center justify-center h-full bg-muted">
            <p>Loading map...</p>
        </div>
    );
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="font-bold">{listing.name}</div>
            <div>{listing.address}</div>
            <div className="font-semibold mt-1">₹{listing.price.toLocaleString()}/mo</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
