// The `ai` object is available globally in the Genkit runtime.
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting design trends based on current fashion.
 *
 * @exports suggestDesignTrends - An async function that takes no input and returns a string of design suggestions.
 * @exports SuggestDesignTrendsOutput - The output type for the suggestDesignTrends function, which is a string.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDesignTrendsOutputSchema = z.string().describe('Design suggestions based on current fashion trends.');
export type SuggestDesignTrendsOutput = z.infer<typeof SuggestDesignTrendsOutputSchema>;

export async function suggestDesignTrends(): Promise<SuggestDesignTrendsOutput> {
  return suggestDesignTrendsFlow();
}

const prompt = ai.definePrompt({
  name: 'suggestDesignTrendsPrompt',
  output: {schema: SuggestDesignTrendsOutputSchema},
  prompt: `You are a fashion trend expert. Provide design suggestions based on current fashion trends. Return the suggestions as a string.

Current trends include the following:
- Athleisure
- Sustainable fashion
- Gender-neutral clothing
- Bold colors
- Oversized clothing`,
});

const suggestDesignTrendsFlow = ai.defineFlow(
  {
    name: 'suggestDesignTrendsFlow',
    outputSchema: SuggestDesignTrendsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
