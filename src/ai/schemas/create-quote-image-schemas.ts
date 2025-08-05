
/**
 * @fileOverview Schemas for the createQuoteImage flow.
 *
 * - CreateQuoteImageInput - The input type for the createQuoteImage function.
 * - CreateQuoteImageOutput - The return type for the createQuoteImage function.
 */

import {z} from 'genkit';

export const CreateQuoteImageInputSchema = z.object({
  quote: z.string().describe('The quote to be placed on the image.'),
  title: z.string().describe('The title of the book the quote is from.'),
});
export type CreateQuoteImageInput = z.infer<typeof CreateQuoteImageInputSchema>;

export const CreateQuoteImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type CreateQuoteImageOutput = z.infer<
  typeof CreateQuoteImageOutputSchema
>;
