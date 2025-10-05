'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getRefundSuggestion } from './actions';
import { Loader2, Wand2, ArrowRight } from 'lucide-react';
import type { SuggestRefundAmountOutput } from '@/ai/flows/suggest-refund-amount';

const FormSchema = z.object({
  refundPolicy: z.string().min(20, {
    message: 'Refund policy must be at least 20 characters.',
  }),
  bookingDetails: z.string().min(20, {
    message: 'Booking details must be at least 20 characters.',
  }),
});

const examplePolicy = `Full refund if cancelled 30 days before check-in.\n50% refund if cancelled 15-29 days before check-in.\nNo refund if cancelled within 14 days of check-in.\nSecurity deposit is fully refundable if there are no damages.`;
const exampleDetails = `Booking Date: 2024-06-01\nCheck-in Date: 2024-08-01\nCancellation Date: 2024-07-10\nTotal Amount Paid: 15,000 (1 month rent)\nSecurity Deposit: 15,000`;


export default function RefundToolPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestRefundAmountOutput | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      refundPolicy: '',
      bookingDetails: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSuggestion(null);

    const result = await getRefundSuggestion(data);

    setIsLoading(false);

    if (result.success && result.data) {
      setSuggestion(result.data);
      toast({
        title: "Suggestion generated!",
        description: "The AI has calculated a suggested refund amount.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.error || "Unable to get a suggestion at this time.",
      });
    }
  }
  
  const fillExample = () => {
    form.setValue('refundPolicy', examplePolicy);
    form.setValue('bookingDetails', exampleDetails);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Wand2 className="h-7 w-7 text-primary" />
            AI Refund Suggestion Tool
          </h1>
          <p className="text-muted-foreground">
            Let AI calculate refund amounts based on your policies.
          </p>
        </div>
        <Button variant="outline" onClick={fillExample}>Fill Example Data</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Refund Details</CardTitle>
            <CardDescription>
              Enter the refund policy and specific booking details to get a suggestion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="refundPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Refund Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Full refund if cancelled 30 days before check-in..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Booking Date: ..., Check-in Date: ..., Cancellation Date: ..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Suggestion
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Suggested Refund</CardTitle>
            <CardDescription>
              The AI-powered suggestion will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4">Analyzing details and calculating refund...</p>
              </div>
            )}
            {!isLoading && !suggestion && (
               <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                  <p>Your refund suggestion will be displayed here once generated.</p>
               </div>
            )}
            {suggestion && (
              <div className="space-y-4 animate-in fade-in-50">
                <div className="text-center bg-primary/10 p-6 rounded-lg">
                  <p className="text-sm text-primary font-semibold">Suggested Refund Amount</p>
                  <p className="text-5xl font-bold text-primary mt-2">
                    ₹{suggestion.suggestedRefundAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md border">
                    {suggestion.explanation}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
