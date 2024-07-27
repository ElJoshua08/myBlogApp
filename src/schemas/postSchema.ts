import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  content: z.string().min(2, "Content must be at least 2 characters long"),
});
