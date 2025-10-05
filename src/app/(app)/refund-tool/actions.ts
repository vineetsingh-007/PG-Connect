'use server';

import { suggestRefundAmount, SuggestRefundAmountInput } from '@/ai/flows/suggest-refund-amount';

export async function getRefundSuggestion(input: SuggestRefundAmountInput) {
  try {
    const result = await suggestRefundAmount(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get refund suggestion: ${errorMessage}` };
  }
}
