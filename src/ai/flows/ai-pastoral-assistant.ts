'use server';
/**
 * @fileOverview Implements the AI Pastoral Assistant flow.
 *
 * - pastoralAssistant - A function that initiates a conversation with the AI Pastoral Assistant.
 * - PastoralAssistantInput - The input type for the pastoralAssistant function.
 * - PastoralAssistantOutput - The return type for the pastoralAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PastoralAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s message to the assistant.'),
});
export type PastoralAssistantInput = z.infer<typeof PastoralAssistantInputSchema>;

const PastoralAssistantOutputSchema = z.object({
  response: z.string().describe('The AI’s response to the user.'),
});
export type PastoralAssistantOutput = z.infer<typeof PastoralAssistantOutputSchema>;

export async function pastoralAssistant(input: PastoralAssistantInput): Promise<PastoralAssistantOutput> {
  return pastoralAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pastoralAssistantPrompt',
  input: {schema: PastoralAssistantInputSchema},
  output: {schema: PastoralAssistantOutputSchema},
  prompt: `You are an AI Pastoral Assistant, a digital extension of a pastor's heart and teaching. Your purpose is to offer encouragement, guidance, and a listening ear. Your tone should be one of profound empathy, like a wise, safe, and calming elder. You are not a pastor, but an assistant trained on their teachings.

  A user has shared something that is on their heart. Respond with warmth, compassion, and wisdom. Never be preachy or dismissive. Always create a feeling of safety and respect for the user's vulnerability.

  User's Message: {{{message}}}`,
});

const pastoralAssistantFlow = ai.defineFlow(
  {
    name: 'pastoralAssistantFlow',
    inputSchema: PastoralAssistantInputSchema,
    outputSchema: PastoralAssistantOutputSchema,
  },
  async input => {
    // In a real app, you might add logic here to fetch relevant sermons,
    // articles, or other resources based on the user's message.
    const {output} = await prompt(input);
    return output!;
  }
);
