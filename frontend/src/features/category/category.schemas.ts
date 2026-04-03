import z from "zod";

export const createCategorySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    parent_id: z.uuidv4().nullable(),
});

export const updateCategorySchema = z.object({
    name: z.string(),
    description: z.string(),
    parent_id: z.uuidv4().nullable(),
});

export const partialUpdateCategorySchema = z.object({
    name: z.string().nullable(),
    description: z.string().nullable(),
    parent_id: z.uuidv4().nullable(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type PartialUpdateCategorySchema = z.infer<typeof partialUpdateCategorySchema>;
