import { z } from "zod";

export const contactUsFormSchema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().email(),
  subject: z.string().max(200),
  message: z.string().max(2000),
});
