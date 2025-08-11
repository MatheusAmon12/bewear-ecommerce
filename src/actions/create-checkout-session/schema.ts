import z from "zod";

export const createSessionSchema = z.object({
  orderId: z.uuid(),
});

export type CreateSessionSchema = z.infer<typeof createSessionSchema>;
