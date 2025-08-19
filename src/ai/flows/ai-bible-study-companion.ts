
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
  context: z.string().optional().describe('The selected Bible verse or passage for context.'),
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
  prompt: `You are a thoughtful AI Bible Study Companion. A user is asking you questions about a passage of scripture.

  Your goal is not to give definitive answers, but to gently guide the user to a deeper understanding by asking thought-provoking questions, providing historical context, and pointing to related scriptures. Keep your responses encouraging and inquisitive.
  
  {{#if context}}
  The user has selected the following passage to discuss:
  "{{context}}"
  {{/if}}

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
