
import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
    email: z.string().email().regex(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {message: "Invalid email address"}),
    password: z.string().length(6, {message: "Password must be 6 characters long"}),
});