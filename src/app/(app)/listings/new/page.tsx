'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Loader2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { listings } from '@/lib/data';
import type { Listing } from '@/lib/types';

const listingFormSchema = z.object({
  name: z.string().min(3, { message: 'PG name must be at least 3 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  location: z.string().min(5, { message: 'Location must be at least 5 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  bookingDate: z.date({
    required_error: 'A booking start date is required.',
  }),
  securityDeposit: z.coerce.number().min(0, { message: 'Security deposit must be a positive number.' }),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export default function NewListingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      location: '',
      imageUrl: '',
      securityDeposit: 0,
    },
  });

  async function onSubmit(data: ListingFormValues) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newListing: Listing = {
      id: `listing-${Date.now()}`,
      name: data.name,
      address: data.location,
      price: data.price,
      imageUrl: data.imageUrl,
      amenities: ['Wi-Fi', 'Food', 'Housekeeping'], // Default amenities for new listing
      description: 'A newly added PG listing.',
      ownerId: 'owner-new',
      rating: 4.0, // Default rating
      lat: 20.5937, // Default coordinates, ideally get from location
      lng: 78.9629,
    };

    // This adds the new listing to the in-memory array.
    // In a real app, this would be an API call to a database.
    listings.unshift(newListing);

    setIsLoading(false);
    toast({
      title: 'Listing Created!',
      description: `${data.name} has been successfully added to your listings.`,
    });
    router.push('/listings');
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Home className="h-7 w-7 text-primary" />
          Create a New Listing
        </h1>
        <p className="text-muted-foreground">
          Add a new PG accommodation to your portfolio.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
          <CardDescription>
            Fill out the form below to add your new listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PG Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Sunrise Student Living" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location / Address</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 123 College Ave, Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (per month)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="15000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="securityDeposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Deposit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="15000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://images.unsplash.com/your-image" {...field} />
                      </FormControl>
                      <FormDescription>
                        Paste a URL to an image of the property.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Available From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                       <FormDescription>
                        When will this listing be available for booking?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  'Add Listing'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
