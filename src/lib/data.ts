import type { Listing, Room, Booking, Review, Conversation, College } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (imageHint: string) => {
  const image = PlaceHolderImages.find(img => img.imageHint.includes(imageHint));
  // Fallback to a random image from the list if the hint is not found
  return image ? image.imageUrl : PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)].imageUrl;
}

export const colleges: College[] = [
  { id: 'clg1', name: 'IIT Bombay', lat: 19.1334, lng: 72.9154 },
  { id: 'clg2', name: 'Delhi University', lat: 28.686273, lng: 77.221085 },
  { id: 'clg3', name: 'IIT Madras', lat: 12.9915, lng: 80.2335 },
  { id: 'clg4', name: 'BITS Pilani', lat: 28.3588, lng: 75.5873 },
  { id: 'clg5', name: 'MIT-ADT', lat: 18.4614, lng: 73.9482 },
];

export const listings: Listing[] = [
  {
    id: '1',
    name: 'Ramayan PG',
    address: '123, Tech Avenue, Powai, Mumbai',
    price: 15000,
    amenities: ['Wi-Fi', 'AC', 'Laundry', 'Food'],
    imageUrl: getImage('building exterior'),
    description: 'A modern and comfortable PG for students with all necessary amenities. Close to major tech parks and colleges.',
    ownerId: 'owner1',
    rating: 4.5,
    nearbyCollegeIds: ['clg1'],
    lat: 19.1350,
    lng: 72.9160,
  },
  {
    id: '2',
    name: 'Ganesh PG',
    address: '45, College Road, Nungambakkam, Chennai',
    price: 12000,
    amenities: ['Wi-Fi', 'Food', 'Housekeeping'],
    imageUrl: getImage('hostel building'),
    description: 'A quiet and studious environment perfect for scholars. Excellent food and clean rooms.',
    ownerId: 'owner2',
    rating: 4.2,
    nearbyCollegeIds: ['clg3'],
    lat: 13.0604,
    lng: 80.2417,
  },
  {
    id: '3',
    name: 'Ambarnath PG',
    address: '78, University Street, Delhi',
    price: 13500,
    amenities: ['Wi-Fi', 'AC', 'Gym'],
    imageUrl: getImage('single room'),
    description: 'Located right next to the university campus. Features a fully equipped gym.',
    ownerId: 'owner1',
    rating: 4.8,
    nearbyCollegeIds: ['clg2'],
    lat: 28.6880,
    lng: 77.2200,
  },
  {
    id: '4',
    name: 'Luxary PG',
    address: '90, Vidya Vihar, Pilani',
    price: 10000,
    amenities: ['Wi-Fi', 'Cooler', 'Food'],
    imageUrl: getImage('apartment exterior'),
    description: 'Affordable and comfortable living for students of BITS Pilani. Homely food included.',
    ownerId: 'owner3',
    rating: 4.0,
    nearbyCollegeIds: ['clg4'],
    lat: 28.3600,
    lng: 75.5880,
  },
  {
    id: '5',
    name: 'Chintamani PG',
    address: '21, Powai Lake Rd, Mumbai',
    price: 18000,
    amenities: ['Wi-Fi', 'AC', 'Laundry', 'Food', 'Gym'],
    imageUrl: getImage('student room'),
    description: 'Premium PG with a view of Powai Lake. Includes access to a modern gym and recreational facilities.',
    ownerId: 'owner2',
    rating: 4.9,
    nearbyCollegeIds: ['clg1'],
    lat: 19.1250,
    lng: 72.9080,
  },
  {
    id: '6',
    name: 'Atlantis PG',
    address: '56, Adyar, Chennai',
    price: 11000,
    amenities: ['Wi-Fi', 'Food'],
    imageUrl: getImage('building facade'),
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
    imageUrl: getImage('hostel interior'),
    description: 'A trendy co-living space with a focus on community and events. Perfect for students looking to network.',
    ownerId: 'owner1',
    rating: 4.7,
    nearbyCollegeIds: ['clg2'],
    lat: 28.5535,
    lng: 77.1942,
  },
];

export const rooms: Room[] = [
  { id: 'r1', listingId: '1', roomNumber: '101', isAvailable: true, unavailableDates: [] },
  { id: 'r2', listingId: '1', roomNumber: '102', isAvailable: false, unavailableDates: [new Date('2024-08-10'), new Date('2024-08-11')] },
  { id: 'r3', listingId: '2', roomNumber: 'A1', isAvailable: true, unavailableDates: [] },
];

export const bookings: Booking[] = [
  { id: 'b1', listingId: '1', roomId: 'r2', studentId: 'stu1', studentName: 'Rohan Sharma', checkIn: new Date('2024-08-01'), checkOut: new Date('2025-05-31'), totalPaid: 150000, status: 'Confirmed' },
  { id: 'b2', listingId: '3', roomId: 'c101', studentId: 'stu2', studentName: 'Priya Singh', checkIn: new Date('2024-07-20'), checkOut: new Date('2025-05-20'), totalPaid: 13500, status: 'Pending' },
  { id: 'b3', listingId: '2', roomId: 'A1', studentId: 'stu3', studentName: 'Anjali Verma', checkIn: new Date('2024-09-01'), checkOut: new Date('2025-06-30'), totalPaid: 12000, status: 'Confirmed' },
];

export const reviews: Review[] = [
  { id: 'rev1', listingId: '1', author: 'Aarav Patel', avatarUrl: getImage('person portrait'), rating: 5, comment: 'Amazing place! Very clean and the owner is very helpful. Food is also great.', date: '2024-05-20' },
  { id: 'rev2', listingId: '1', author: 'Sneha Reddy', avatarUrl: getImage('woman portrait'), rating: 4, comment: 'Good location and amenities. Wi-Fi can be a bit slow at times.', date: '2024-04-15' },
  { id: 'rev3', listingId: '3', author: 'Vikram Kumar', avatarUrl: getImage('man portrait'), rating: 5, comment: 'Best PG near the campus. The gym is a huge plus!', date: '2024-06-01' },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    userName: 'Kavya Mishra',
    userAvatar: getImage('woman portrait'),
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
    userAvatar: getImage('man portrait'),
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
