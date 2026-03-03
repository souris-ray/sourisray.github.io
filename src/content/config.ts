import { defineCollection, z } from 'astro:content';

const scripts = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        total_word_count: z.number(),
        spoken_word_count: z.number(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        type: z.string(),
        pdf: z.string().optional(),
    }),
});

export const collections = { scripts };
