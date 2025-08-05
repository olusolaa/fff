
'use server';
/**
 * @fileOverview A flow for creating a shareable quote image.
 *
 * - createQuoteImage - A function that generates an image with a quote.
 */

import {ai} from '@/ai/genkit';
import {
  CreateQuoteImageInput,
  CreateQuoteImageOutput,
} from '@/ai/schemas/create-quote-image-schemas';

export async function createQuoteImage(
  input: CreateQuoteImageInput
): Promise<CreateQuoteImageOutput> {
  const {media} = await ai.generate({
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    prompt: `Generate a beautiful, inspiring, and shareable image for a social media post.
      The image should be visually stunning and relevant to the theme of the book title: "${input.title}".
      The image must prominently feature the following quote: "${input.quote}".
      The quote should be elegant and highly readable.
      Do not include any other text or logos. The style should be photographic and uplifting.
      The image should be in a vertical aspect ratio (9:16) suitable for stories.`,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  if (!media.url) {
    throw new Error('Failed to generate image.');
  }

  return {imageUrl: media.url};
}
