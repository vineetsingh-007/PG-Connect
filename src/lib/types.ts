export type Listing = {
  id: string;
  name: string;
  address: string;
  price: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  ownerId: string;
  rating: number;
  nearbyCollegeIds?: string[];
  lat: number;
  lng: number;
};

export type Room = {
  id: string;
  listingId: string;
  roomNumber: string;
  isAvailable: boolean;
  unavailableDates: Date[];
};

export type Booking = {
  id: string;
  listingId: string;
  roomId: string;
  studentId: string;
  studentName: string;
  checkIn: Date;
  checkOut: Date;
  totalPaid: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export type Review = {
  id: string;
  listingId: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
};

export type Message = {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'owner';
};

export type Conversation = {
  id: string;
  userName: string;
  userAvatar: string;
  listingName: string;
  lastMessage: string;
  lastMessageTimestamp: Date;
  messages: Message[];
};

export type College = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};
