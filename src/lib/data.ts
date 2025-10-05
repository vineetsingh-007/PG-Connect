import type { Listing, Room, Booking, Review, Conversation, College } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const colleges: College[] = [
  { id: 'clg1', name: 'IIT Bombay', lat: 19.1334, lng: 72.9154 },
  { id: 'clg2', name: 'Delhi University', lat: 28.686273, lng: 77.221085 },
  { id: 'clg3', name: 'IIT Madras', lat: 12.9915, lng: 80.2335 },
  { id: 'clg4', name: 'BITS Pilani', lat: 28.3588, lng: 75.5873 },
  { id: 'clg5', name: 'MIT-ADT', lat: 18.4614, lng: 73.9482 },
];

export const listings: Listing[] = [
  {
    id: '2',
    name: 'Ganesh PG',
    address: '45, College Road, Nungambakkam, Chennai',
    price: 12000,
    amenities: ['Wi-Fi', 'Food', 'Housekeeping'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDB8fHx8MTc1OTcxMTAxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A quiet and studious environment perfect for scholars. Excellent food and clean rooms.',
    ownerId: 'owner2',
    rating: 4.2,
    nearbyCollegeIds: ['clg3'],
    lat: 13.0604,
    lng: 80.2417,
  },
  {
    id: '4',
    name: 'Luxary PG',
    address: '90, Vidya Vihar, Pilani',
    price: 10000,
    amenities: ['Wi-Fi', 'Cooler', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwwfHx8fDE3NTk3MDQ5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Affordable and comfortable living for students of BITS Pilani. Homely food included.',
    ownerId: 'owner3',
    rating: 4.0,
    nearbyCollegeIds: ['clg4'],
    lat: 28.3600,
    lng: 75.5880,
  },
  {
    id: '6',
    name: 'Atlantis PG',
    address: '56, Adyar, Chennai',
    price: 11000,
    amenities: ['Wi-Fi', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGZhY2FkZXxlbnwwfHx8fDE3NTk3MDUwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A lively and social PG for students. Great community and regular events.',
    ownerId: 'owner3',
    rating: 4.3,
    nearbyCollegeIds: ['clg3'],
    lat: 13.0064,
    lng: 80.2572,
  },
  {
    id: '7',
    name: 'Homies Living PG',
    address: '15, Hauz Khas Village, Delhi',
    price: 16000,
    amenities: ['Wi-Fi', 'AC', 'Housekeeping', 'Social Events'],
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwwfHx8fDE3NTk3MTExNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A trendy co-living space with a focus on community and events. Perfect for students looking to network.',
    ownerId: 'owner1',
    rating: 4.7,
    nearbyCollegeIds: ['clg2'],
    lat: 28.5535,
    lng: 77.1942,
  },
  {
    id: '8',
    name: 'Ambarnath PG',
    address: '101, Loni Kalbhor, Pune',
    price: 9500,
    amenities: ['Wi-Fi', 'Laundry', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwwfHx8fDE3NTk3MDQ5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Affordable student accommodation with single and double sharing rooms, Wi-Fi, laundry, and mess facilities. Located 1.2 km from MIT-ADT campus.',
    ownerId: 'owner2',
    rating: 4.1,
    nearbyCollegeIds: ['clg5'],
    lat: 18.4684,
    lng: 73.9522,
  },
  {
    id: '9',
    name: 'Homies Living',
    address: '22, Rajbaug, Loni Kalbhor, Pune',
    price: 14000,
    amenities: ['Wi-Fi', 'Housekeeping', 'Gym'],
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGZhY2FkZXxlbnwwfHx8fDE3NTk3MDUwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium co-living space offering furnished rooms, study desks, housekeeping, and gym access. Located 800 meters from MIT-ADT campus.',
    ownerId: 'owner3',
    rating: 4.6,
    nearbyCollegeIds: ['clg5'],
    lat: 18.4621,
    lng: 73.9410,
  }
];

export const rooms: Room[] = [
  { id: 'r3', listingId: '2', roomNumber: 'A1', isAvailable: true, unavailableDates: [] },
];

export const bookings: Booking[] = [
  { id: 'b3', listingId: '2', roomId: 'A1', studentId: 'stu3', studentName: 'Anjali Verma', checkIn: new Date('2024-09-01'), checkOut: new Date('2025-06-30'), totalPaid: 12000, status: 'Confirmed' },
];

export const reviews: Review[] = [
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    userName: 'Kavya Mishra',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk2MjQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    listingName: 'Ramayan PG',
    lastMessage: 'Is the room still available?',
    lastMessageTimestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    messages: [
      { id: 'm1', text: 'Hello, I am interested in the single room at Ramayan PG.', sender: 'user', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
      { id: 'm2', text: 'Hi Kavya, which room are you referring to?', sender: 'owner', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
      { id: 'm3', text: 'The one listed for 15,000. Is it still available for booking?', sender: 'user', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
    ],
  },
  {
    id: 'conv2',
    userName: 'Arjun Desai',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk2MjQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    listingName: 'Ambarnath PG',
    lastMessage: 'Thank you!',
    lastMessageTimestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    messages: [
      { id: 'm4', text: 'I have completed the payment.', sender: 'user', timestamp: new Date(new Date().setDate(new Date().getDate() - 2)) },
      { id: 'm5', text: 'Great, we have received it. Your booking is confirmed.', sender: 'owner', timestamp: new Date(new Date().setDate(new Date().getDate() - 2)) },
      { id: 'm6', text: 'Thank you!', sender: 'user', timestamp: new Date(new Date().setDate(new Date().getDate() - 2)) },
    ],
  },
];
