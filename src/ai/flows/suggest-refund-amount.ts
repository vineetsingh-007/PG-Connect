'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting refund amounts based on configured refund policies.
 *
 * - suggestRefundAmount - A function that takes refund policy and booking details and suggests a refund amount.
 * - SuggestRefundAmountInput - The input type for the suggestRefundAmount function.
 * - SuggestRefundAmountOutput - The return type for the suggestRefundAmount function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRefundAmountInputSchema = z.object({
  refundPolicy: z
    .string()
    .describe(
      'The refund policy of the PG, defining the conditions for refunds based on cancellation time.'
    ),
  bookingDetails: z
    .string()
    .describe(
      'The booking details, including booking date, cancellation date, total amount paid, and any relevant information.'
    ),
});
export type SuggestRefundAmountInput = z.infer<typeof SuggestRefundAmountInputSchema>;

const SuggestRefundAmountOutputSchema = z.object({
  suggestedRefundAmount: z
    .number()
    .describe(
      'The suggested refund amount based on the refund policy and booking details.'
    ),
  explanation: z
    .string()
    .describe(
      'A brief explanation of how the refund amount was calculated based on the refund policy and booking details.'
    ),
});
export type SuggestRefundAmountOutput = z.infer<typeof SuggestRefundAmountOutputSchema>;

export async function suggestRefundAmount(
  input: SuggestRefundAmountInput
): Promise<SuggestRefundAmountOutput> {
  return suggestRefundAmountFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRefundAmountPrompt',
  input: {schema: SuggestRefundAmountInputSchema},
  output: {schema: SuggestRefundAmountOutputSchema},
  prompt: `You are an expert in processing refunds according to refund policies.

You will receive the refund policy and booking details. You will determine the suggested refund amount and explain how you arrived at this amount.  The refund amount MUST be in number format and not a string.

Refund Policy: {{{refundPolicy}}}
Booking Details: {{{bookingDetails}}}`,
});

const suggestRefundAmountFlow = ai.defineFlow(
  {
    name: 'suggestRefundAmountFlow',
    inputSchema: SuggestRefundAmountInputSchema,
    outputSchema: SuggestRefundAmountOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
