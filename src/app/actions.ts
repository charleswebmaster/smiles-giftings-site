'use server';

import { suggestDesignTrends } from '@/ai/flows/suggest-design-trends';

export async function getAiDesignSuggestions() {
  try {
    const suggestions = await suggestDesignTrends();
    return { success: true, suggestions };
  } catch (error) {
    console.error('Error fetching AI design suggestions:', error);
    return { success: false, error: 'Failed to get suggestions. Please try again later.' };
  }
}
