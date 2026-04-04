import z from "zod";

export const createCategorySchema = z.object({
    name: z.string(),
    description: z.string(),
    parent_id: z.string(),
});

export const updateCategorySchema = createCategorySchema;

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
