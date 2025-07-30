'use server';
/**
 * @fileOverview Implements the AI Bible Study Companion flow.
 *
 * - bibleStudyCompanion - A function that initiates a conversation with the AI Bible Study Companion.
 * - BibleStudyCompanionInput - The input type for the bibleStudyCompanion function.
 * - BibleStudyCompanionOutput - The return type for the bibleStudyCompanion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BibleStudyCompanionInputSchema = z.object({
  question: z.string().describe('The user question about the sermon.'),
});
export type BibleStudyCompanionInput = z.infer<typeof BibleStudyCompanionInputSchema>;

const BibleStudyCompanionOutputSchema = z.object({
  response: z.string().describe('The AI’s response to the user question.'),
});
export type BibleStudyCompanionOutput = z.infer<typeof BibleStudyCompanionOutputSchema>;

export async function bibleStudyCompanion(input: BibleStudyCompanionInput): Promise<BibleStudyCompanionOutput> {
  return bibleStudyCompanionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bibleStudyCompanionPrompt',
  input: {schema: BibleStudyCompanionInputSchema},
  output: {schema: BibleStudyCompanionOutputSchema},
  prompt: `You are a thoughtful AI Bible Study Companion.  A user is asking you questions about a sermon they just watched.

  Respond to the user's question in a personal, private, and focused manner.  Your response should flow naturally and be easily readable.

  User's Question: {{{question}}}`,
});

const bibleStudyCompanionFlow = ai.defineFlow(
  {
    name: 'bibleStudyCompanionFlow',
    inputSchema: BibleStudyCompanionInputSchema,
    outputSchema: BibleStudyCompanionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
